const STORAGE_KEY = "sorteo-simple-state";
const TOAST_DURATION_MS = 2800;
const DRAW_ANIMATION_MS = 620;

const {
    MIN_PRIZES,
    sanitizePrizeCount,
    parseParticipants,
    getDuplicateEntries,
    dedupeParticipants,
    buildEligibleParticipants,
    validateRaffle,
    pickWinners,
    formatWinners,
} = window.RaffleCore;

const raffleForm = document.getElementById("raffleForm");
const prizesInput = document.getElementById("cantPremios");
const participantsInput = document.getElementById("formControlTextArea1");
const resultOutput = document.getElementById("formControlTextArea2");
const copyButton = document.getElementById("copyButton");
const exportButton = document.getElementById("exportButton");
const resetButton = document.getElementById("resetButton");
const rerollButton = document.getElementById("rerollButton");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const removeDuplicatesButton = document.getElementById("removeDuplicatesButton");
const excludePreviousWinnersInput = document.getElementById("excludePreviousWinners");
const autoRemoveDuplicatesInput = document.getElementById("autoRemoveDuplicates");
const participantsCounter = document.getElementById("participantsCounter");
const participantsMetrics = document.getElementById("participantsMetrics");
const summaryPrizes = document.getElementById("summaryPrizes");
const summaryParticipants = document.getElementById("summaryParticipants");
const summaryDuplicateParticipants = document.getElementById("summaryDuplicateParticipants");
const resultBadge = document.getElementById("resultBadge");
const winnerReveal = document.getElementById("winnerReveal");
const emptyState = document.getElementById("emptyState");
const historyText = document.getElementById("historyText");
const prizeError = document.getElementById("prizeError");
const participantsError = document.getElementById("participantsError");
const toast = document.getElementById("toast");
const panelTops = document.querySelectorAll(".panel-top");
const confirmDialog = document.getElementById("confirmDialog");
const confirmMessage = document.getElementById("confirmMessage");
const confirmCancelButton = document.getElementById("confirmCancelButton");
const confirmAcceptButton = document.getElementById("confirmAcceptButton");

let toastTimeoutId;
let drawAnimationTimeoutId;
let pendingConfirmationResolve;

const state = {
    previousWinners: [],
    lastUsedParticipants: [],
};

function loadState() {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const parsed = JSON.parse(saved);
        prizesInput.value = String(sanitizePrizeCount(parsed.prizeCount ?? MIN_PRIZES));
        participantsInput.value = parsed.participantsText ?? "";
        resultOutput.value = parsed.resultText ?? "";
        excludePreviousWinnersInput.checked = Boolean(parsed.excludePreviousWinners);
        autoRemoveDuplicatesInput.checked = Boolean(parsed.autoRemoveDuplicates);
        state.previousWinners = Array.isArray(parsed.previousWinners) ? parsed.previousWinners : [];
        state.lastUsedParticipants = Array.isArray(parsed.lastUsedParticipants) ? parsed.lastUsedParticipants : [];
    } catch (error) {
        console.error(error);
    }
}

function persistState() {
    const snapshot = {
        prizeCount: sanitizePrizeCount(prizesInput.value),
        participantsText: participantsInput.value,
        resultText: resultOutput.value,
        excludePreviousWinners: excludePreviousWinnersInput.checked,
        autoRemoveDuplicates: autoRemoveDuplicatesInput.checked,
        previousWinners: state.previousWinners,
        lastUsedParticipants: state.lastUsedParticipants,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function showToast(message, tone = "success") {
    window.clearTimeout(toastTimeoutId);
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.classList.add("show");

    toastTimeoutId = window.setTimeout(() => {
        toast.classList.remove("show");
    }, TOAST_DURATION_MS);
}

function requestConfirmation(message) {
    confirmMessage.textContent = message;
    confirmDialog.hidden = false;
    confirmCancelButton.focus();

    return new Promise((resolve) => {
        pendingConfirmationResolve = resolve;
    });
}

function closeConfirmation(confirmed) {
    confirmDialog.hidden = true;

    if (pendingConfirmationResolve) {
        pendingConfirmationResolve(confirmed);
        pendingConfirmationResolve = null;
    }
}

function getCurrentParticipants() {
    return parseParticipants(participantsInput.value);
}

function getParticipantsOverview() {
    const participants = getCurrentParticipants();
    const duplicates = getDuplicateEntries(participants);
    const uniqueParticipants = dedupeParticipants(participants);
    const eligibleParticipants = buildEligibleParticipants(
        uniqueParticipants,
        state.previousWinners,
        excludePreviousWinnersInput.checked,
    );

    return {
        participants,
        duplicates,
        uniqueParticipants,
        eligibleParticipants,
    };
}

function setFieldError(element, input, message) {
    element.textContent = message;
    input.classList.toggle("input-invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function renderMetrics(overview) {
    const chips = [];

    if (overview.duplicates.length > 0) {
        const duplicateCount = overview.duplicates.reduce((total, duplicate) => total + duplicate.count - 1, 0);
        chips.push(`<span class="meta-chip warning">${duplicateCount} repetidos</span>`);
    }

    if (excludePreviousWinnersInput.checked && state.previousWinners.length > 0) {
        chips.push(`<span class="meta-chip">${overview.eligibleParticipants.length} disponibles</span>`);
    }

    participantsMetrics.innerHTML = chips.join("");
}

function updateSummary() {
    const prizes = sanitizePrizeCount(prizesInput.value);
    const overview = getParticipantsOverview();
    const total = overview.participants.length;
    const label = total === 1 ? "participante" : "participantes";
    const duplicateEntriesCount = overview.duplicates.reduce((totalDuplicates, duplicate) => {
        return totalDuplicates + duplicate.count - 1;
    }, 0);

    participantsCounter.textContent = `${total} ${label}`;
    summaryPrizes.textContent = String(prizes);
    summaryParticipants.textContent = String(overview.eligibleParticipants.length);
    summaryDuplicateParticipants.textContent = String(duplicateEntriesCount);
    historyText.textContent = state.previousWinners.length
        ? state.previousWinners.join(", ")
        : "Todavía no se excluyeron ganadores previos.";
    removeDuplicatesButton.disabled = overview.duplicates.length === 0;
    rerollButton.disabled = overview.uniqueParticipants.length === 0;
    exportButton.disabled = !resultOutput.value.trim();
    copyButton.disabled = !resultOutput.value.trim();
    clearHistoryButton.disabled = state.previousWinners.length === 0;

    renderMetrics(overview);
    persistState();
}

function renderResultState(hasResult) {
    emptyState.classList.toggle("empty-state-hidden", hasResult);
    resultBadge.textContent = hasResult ? "Ultimo sorteo listo" : "Sin sorteo";
    resultBadge.className = `counter ${hasResult ? "counter-success" : "counter-neutral"}`;
}

function extractWinnersFromResultText(resultText) {
    return String(resultText)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const separatorIndex = line.indexOf(":");
            return separatorIndex >= 0 ? line.slice(separatorIndex + 1).trim() : line;
        });
}

function renderWinnerReveal(winners) {
    if (!winners.length) {
        winnerReveal.innerHTML = "";
        winnerReveal.classList.remove("has-winners");
        return;
    }

    winnerReveal.classList.add("has-winners");
    winnerReveal.innerHTML = winners.map((winner, index) => {
        const label = winners.length === 1 ? "Ganador" : `Premio ${index + 1}`;
        const singleClass = winners.length === 1 ? " single" : "";
        const delay = `${index * 90}ms`;

        return `
            <article class="winner-card${singleClass}" style="--delay:${delay}">
                <span>${label}</span>
                <strong>${winner}</strong>
            </article>
        `;
    }).join("");
}

function validateFormForUI() {
    const prizes = sanitizePrizeCount(prizesInput.value);
    const overview = getParticipantsOverview();
    const validation = validateRaffle({
        participants: autoRemoveDuplicatesInput.checked ? overview.uniqueParticipants : overview.participants,
        prizeCount: prizes,
        previousWinners: state.previousWinners,
        excludePreviousWinners: excludePreviousWinnersInput.checked,
    });

    setFieldError(prizeError, prizesInput, prizes >= MIN_PRIZES ? "" : "La cantidad de premios es inválida.");
    setFieldError(
        participantsError,
        participantsInput,
        validation.valid ? "" : validation.message,
    );

    return validation;
}

function animateDraw() {
    resultOutput.classList.remove("is-drawing");
    window.clearTimeout(drawAnimationTimeoutId);
    void resultOutput.offsetWidth;
    resultOutput.classList.add("is-drawing");
    drawAnimationTimeoutId = window.setTimeout(() => {
        resultOutput.classList.remove("is-drawing");
    }, DRAW_ANIMATION_MS);
}

function syncPanelTopHeights() {
    panelTops.forEach((panelTop) => {
        panelTop.style.minHeight = "";
    });

    if (window.innerWidth <= 640 || panelTops.length === 0) {
        return;
    }

    const tallestHeight = Math.max(...Array.from(panelTops, (panelTop) => panelTop.offsetHeight));

    panelTops.forEach((panelTop) => {
        panelTop.style.minHeight = `${tallestHeight}px`;
    });
}

function performRaffle(options) {
    const prizes = sanitizePrizeCount(prizesInput.value);
    const overview = getParticipantsOverview();
    const sourceParticipants = options.useCurrentText
        ? (autoRemoveDuplicatesInput.checked ? overview.uniqueParticipants : overview.participants)
        : state.lastUsedParticipants;
    const validation = validateRaffle({
        participants: sourceParticipants,
        prizeCount: prizes,
        previousWinners: state.previousWinners,
        excludePreviousWinners: excludePreviousWinnersInput.checked,
    });

    prizesInput.value = String(prizes);
    updateSummary();
    validateFormForUI();

    if (!validation.valid) {
        resultOutput.value = "";
        renderWinnerReveal([]);
        renderResultState(false);
        showToast(validation.message, "error");
        return false;
    }

    const excludedParticipants = excludePreviousWinnersInput.checked ? state.previousWinners : [];
    const winners = pickWinners(sourceParticipants, prizes, excludedParticipants);
    resultOutput.value = formatWinners(winners);
    renderWinnerReveal(winners);
    state.lastUsedParticipants = [...sourceParticipants];

    if (excludePreviousWinnersInput.checked) {
        state.previousWinners = dedupeParticipants([...state.previousWinners, ...winners]);
    }

    renderResultState(true);
    updateSummary();
    animateDraw();
    showToast(options.toastMessage, "success");
    return true;
}

function handlePrizeInput() {
    prizesInput.value = String(sanitizePrizeCount(prizesInput.value));
    validateFormForUI();
    updateSummary();
}

function handleParticipantsInput() {
    validateFormForUI();
    updateSummary();
}

function handleSubmit(event) {
    event.preventDefault();
    performRaffle({
        useCurrentText: true,
        toastMessage: "Sorteo realizado con éxito.",
    });
}

function handleReroll() {
    const overview = getParticipantsOverview();

    if (overview.uniqueParticipants.length === 0) {
        showToast("Primero cargá participantes para poder volver a sortear.", "warning");
        return;
    }

    if (state.lastUsedParticipants.length === 0) {
        state.lastUsedParticipants = autoRemoveDuplicatesInput.checked ? overview.uniqueParticipants : overview.participants;
    }

    performRaffle({
        useCurrentText: false,
        toastMessage: "Nuevo sorteo generado.",
    });
}

async function handleCopy() {
    if (!resultOutput.value.trim()) {
        showToast("Todavía no hay resultado para copiar.", "warning");
        return;
    }

    try {
        await navigator.clipboard.writeText(resultOutput.value);
        showToast("Resultado copiado al portapapeles.", "success");
    } catch (error) {
        console.error(error);
        showToast("No se pudo copiar el resultado.", "error");
    }
}

function handleExport() {
    if (!resultOutput.value.trim()) {
        showToast("Todavía no hay resultado para exportar.", "warning");
        return;
    }

    const blob = new Blob([resultOutput.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "resultado-sorteo.txt";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showToast("Resultado exportado en TXT.", "success");
}

function handleRemoveDuplicates() {
    const participants = getCurrentParticipants();
    const uniqueParticipants = dedupeParticipants(participants);

    if (participants.length === uniqueParticipants.length) {
        showToast("No hay participantes repetidos para limpiar.", "warning");
        return;
    }

    participantsInput.value = uniqueParticipants.join("\n");
    validateFormForUI();
    updateSummary();
    showToast("Se eliminaron los participantes repetidos.", "success");
}

async function handleClearHistory() {
    const confirmed = await requestConfirmation("Se va a borrar el historial de ganadores excluidos. Después vas a poder volver a usar esos nombres en próximos sorteos.");

    if (!confirmed) {
        return;
    }

    state.previousWinners = [];
    validateFormForUI();
    updateSummary();
    showToast("Se borró el historial de ganadores excluidos.", "success");
}

async function handleReset(event) {
    event.preventDefault();
    const hasContent = Boolean(
        participantsInput.value.trim() ||
        resultOutput.value.trim() ||
        state.previousWinners.length > 0 ||
        excludePreviousWinnersInput.checked ||
        autoRemoveDuplicatesInput.checked,
    );

    if (!hasContent) {
        raffleForm.reset();
        prizesInput.value = String(MIN_PRIZES);
        renderWinnerReveal([]);
        renderResultState(false);
        updateSummary();
        return;
    }

    const confirmed = await requestConfirmation("Se van a limpiar participantes, resultado y opciones activas. Esta acción no se puede deshacer.");

    if (!confirmed) {
        return;
    }

    window.requestAnimationFrame(() => {
        raffleForm.reset();
        prizesInput.value = String(MIN_PRIZES);
        participantsInput.value = "";
        resultOutput.value = "";
        renderWinnerReveal([]);
        excludePreviousWinnersInput.checked = false;
        autoRemoveDuplicatesInput.checked = false;
        state.previousWinners = [];
        state.lastUsedParticipants = [];
        setFieldError(prizeError, prizesInput, "");
        setFieldError(participantsError, participantsInput, "");
        renderResultState(false);
        updateSummary();
        showToast("Formulario reiniciado.", "success");
    });
}

loadState();
raffleForm.addEventListener("submit", handleSubmit);
prizesInput.addEventListener("input", handlePrizeInput);
participantsInput.addEventListener("input", handleParticipantsInput);
excludePreviousWinnersInput.addEventListener("change", () => {
    validateFormForUI();
    updateSummary();
});
autoRemoveDuplicatesInput.addEventListener("change", () => {
    validateFormForUI();
    updateSummary();
});
copyButton.addEventListener("click", handleCopy);
exportButton.addEventListener("click", handleExport);
resetButton.addEventListener("click", handleReset);
rerollButton.addEventListener("click", handleReroll);
clearHistoryButton.addEventListener("click", handleClearHistory);
removeDuplicatesButton.addEventListener("click", handleRemoveDuplicates);
confirmCancelButton.addEventListener("click", () => closeConfirmation(false));
confirmAcceptButton.addEventListener("click", () => closeConfirmation(true));
confirmDialog.addEventListener("click", (event) => {
    if (event.target === confirmDialog) {
        closeConfirmation(false);
    }
});
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !confirmDialog.hidden) {
        closeConfirmation(false);
    }
});
window.addEventListener("load", syncPanelTopHeights);
window.addEventListener("resize", syncPanelTopHeights);

prizesInput.value = String(sanitizePrizeCount(prizesInput.value));
renderWinnerReveal(extractWinnersFromResultText(resultOutput.value));
renderResultState(Boolean(resultOutput.value.trim()));
validateFormForUI();
updateSummary();
syncPanelTopHeights();
