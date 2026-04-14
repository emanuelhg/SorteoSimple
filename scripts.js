const STORAGE_KEY = "sorteo-simple-state";
const LANGUAGE_STORAGE_KEY = "sorteo-simple-language";
const TOAST_DURATION_MS = 2800;
const DRAW_ANIMATION_MS = 620;

const I18N = {
    es: {
        pageDescription: "Herramienta moderna para sortear ganadores de forma aleatoria, sin repetir nombres.",
        heroEyebrow: "Sorteos sin vueltas",
        heroCopy: "Cargá participantes, definí premios y obtené ganadores al instante con una herramienta simple y clara.",
        formHeading: "Configurar sorteo",
        formSubheading: "Prepará la lista, ajustá opciones y dejá todo listo para sortear.",
        prizeLabel: "Cantidad de premios",
        prizeHelp: "Permitido: entre 1 y 100 premios.",
        participantsLabel: "Participantes",
        participantsPlaceholder: "Escribí un participante por línea",
        participantsHelp: "Las líneas vacías se ignoran. Podés limpiar nombres repetidos en un clic.",
        removeDuplicatesButton: "Quitar repetidos",
        advancedOptionsSummary: "Opciones avanzadas",
        excludePreviousLabel: "Excluir ganadores previos al volver a sortear",
        autoRemoveDuplicatesLabel: "Quitar repetidos automáticamente al sortear",
        drawButton: "Sortear ahora",
        rerollButton: "Sortear de nuevo",
        resetButton: "Limpiar todo",
        resultHeading: "Resultado",
        resultSubheading: "Visualizá los ganadores, copiá el texto o exportalo para compartirlo.",
        summaryPrizesLabel: "Premios",
        summaryParticipantsLabel: "Participantes válidos",
        summaryDuplicatesLabel: "repetidos",
        winnersLabel: "Ganadores",
        noResult: "Sin sorteo",
        latestResultReady: "Último sorteo listo",
        emptyStateTitle: "Todo listo para empezar",
        emptyStateText: "Cuando ejecutes el sorteo, vas a ver aquí los ganadores numerados y vas a poder copiarlos o exportarlos.",
        resultPlaceholder: "Todavía no hay un sorteo realizado",
        resultHelp: "El resultado se genera automáticamente y queda bloqueado para evitar cambios manuales.",
        historyLabel: "Ganadores acumulados excluidos",
        historyEmpty: "Todavía no se excluyeron ganadores previos.",
        copyButton: "Copiar resultado",
        exportButton: "Exportar TXT",
        clearHistoryButton: "Borrar historial",
        footerText: "Creado por E.G.",
        confirmTitle: "Confirmar acción",
        confirmCancelButton: "Cancelar",
        confirmAcceptButton: "Continuar",
        participantSingle: "participante",
        participantPlural: "participantes",
        duplicatesMetric: "repetidos",
        availableMetric: "disponibles",
        invalidPrizeCount: "La cantidad de premios es inválida.",
        validation_no_participants: "Ingresá al menos un participante para realizar el sorteo.",
        validation_invalid_prize_count: "La cantidad de premios debe estar entre 1 y 100.",
        validation_no_eligible_participants: "No quedan participantes disponibles con las opciones actuales.",
        validation_too_many_prizes: "La cantidad de premios no puede superar a los participantes disponibles.",
        raffleDone: "Sorteo realizado con éxito.",
        rerollNeedParticipants: "Primero cargá participantes para poder volver a sortear.",
        rerollDone: "Nuevo sorteo generado.",
        noResultToCopy: "Todavía no hay resultado para copiar.",
        copiedResult: "Resultado copiado al portapapeles.",
        copyFailed: "No se pudo copiar el resultado.",
        noResultToExport: "Todavía no hay resultado para exportar.",
        exportedResult: "Resultado exportado en TXT.",
        noDuplicatesToClean: "No hay participantes repetidos para limpiar.",
        duplicatesRemoved: "Se eliminaron los participantes repetidos.",
        clearHistoryConfirm: "Se va a borrar el historial de ganadores excluidos. Después vas a poder volver a usar esos nombres en próximos sorteos.",
        clearHistoryDone: "Se borró el historial de ganadores excluidos.",
        resetConfirm: "Se van a limpiar participantes, resultado y opciones activas. Esta acción no se puede deshacer.",
        resetDone: "Formulario reiniciado.",
        confirmCancel: false,
        winnerSingle: "Ganador",
        prizePrefix: "Premio",
    },
    en: {
        pageDescription: "Modern tool to draw winners at random without repeating names.",
        heroEyebrow: "Quick raffles",
        heroCopy: "Add participants, set prizes, and get winners instantly with a simple and clear tool.",
        formHeading: "Setup raffle",
        formSubheading: "Prepare the list, adjust options, and get everything ready to draw.",
        prizeLabel: "Number of prizes",
        prizeHelp: "Allowed range: from 1 to 100 prizes.",
        participantsLabel: "Participants",
        participantsPlaceholder: "Write one participant per line",
        participantsHelp: "Empty lines are ignored. You can clean repeated names in one click.",
        removeDuplicatesButton: "Remove duplicates",
        advancedOptionsSummary: "Advanced options",
        excludePreviousLabel: "Exclude previous winners when drawing again",
        autoRemoveDuplicatesLabel: "Remove duplicates automatically when drawing",
        drawButton: "Draw now",
        rerollButton: "Draw again",
        resetButton: "Clear all",
        resultHeading: "Result",
        resultSubheading: "View the winners, copy the text, or export it to share.",
        summaryPrizesLabel: "Prizes",
        summaryParticipantsLabel: "Eligible participants",
        summaryDuplicatesLabel: "duplicates",
        winnersLabel: "Winners",
        noResult: "No draw yet",
        latestResultReady: "Latest draw ready",
        emptyStateTitle: "Everything is ready",
        emptyStateText: "When you run the draw, you will see the numbered winners here and you will be able to copy or export them.",
        resultPlaceholder: "There is no draw yet",
        resultHelp: "The result is generated automatically and stays locked to avoid manual changes.",
        historyLabel: "Excluded winners history",
        historyEmpty: "No previous winners have been excluded yet.",
        copyButton: "Copy result",
        exportButton: "Export TXT",
        clearHistoryButton: "Clear history",
        footerText: "Created by E.G.",
        confirmTitle: "Confirm action",
        confirmCancelButton: "Cancel",
        confirmAcceptButton: "Continue",
        participantSingle: "participant",
        participantPlural: "participants",
        duplicatesMetric: "duplicates",
        availableMetric: "available",
        invalidPrizeCount: "The prize count is invalid.",
        validation_no_participants: "Enter at least one participant to run the draw.",
        validation_invalid_prize_count: "The prize count must be between 1 and 100.",
        validation_no_eligible_participants: "There are no participants available with the current options.",
        validation_too_many_prizes: "The prize count cannot be greater than the available participants.",
        raffleDone: "Draw completed successfully.",
        rerollNeedParticipants: "Add participants first so you can draw again.",
        rerollDone: "New draw generated.",
        noResultToCopy: "There is no result to copy yet.",
        copiedResult: "Result copied to the clipboard.",
        copyFailed: "The result could not be copied.",
        noResultToExport: "There is no result to export yet.",
        exportedResult: "Result exported as TXT.",
        noDuplicatesToClean: "There are no duplicated participants to clean.",
        duplicatesRemoved: "Duplicated participants were removed.",
        clearHistoryConfirm: "This will clear the excluded winners history. Those names will be available again in future draws.",
        clearHistoryDone: "Excluded winners history was cleared.",
        resetConfirm: "This will clear participants, result, and active options. This action cannot be undone.",
        resetDone: "Form reset.",
        winnerSingle: "Winner",
        prizePrefix: "Prize",
    },
    pt: {
        pageDescription: "Ferramenta moderna para sortear vencedores aleatoriamente sem repetir nomes.",
        heroEyebrow: "Sorteios sem enrolação",
        heroCopy: "Adicione participantes, defina prêmios e obtenha vencedores na hora com uma ferramenta simples e clara.",
        formHeading: "Configurar sorteio",
        formSubheading: "Prepare a lista, ajuste as opções e deixe tudo pronto para sortear.",
        prizeLabel: "Quantidade de prêmios",
        prizeHelp: "Permitido: entre 1 e 100 prêmios.",
        participantsLabel: "Participantes",
        participantsPlaceholder: "Escreva um participante por linha",
        participantsHelp: "Linhas vazias são ignoradas. Você pode remover nomes repetidos com um clique.",
        removeDuplicatesButton: "Remover repetidos",
        advancedOptionsSummary: "Opções avançadas",
        excludePreviousLabel: "Excluir vencedores anteriores ao sortear novamente",
        autoRemoveDuplicatesLabel: "Remover repetidos automaticamente ao sortear",
        drawButton: "Sortear agora",
        rerollButton: "Sortear novamente",
        resetButton: "Limpar tudo",
        resultHeading: "Resultado",
        resultSubheading: "Veja os vencedores, copie o texto ou exporte para compartilhar.",
        summaryPrizesLabel: "Prêmios",
        summaryParticipantsLabel: "Participantes válidos",
        summaryDuplicatesLabel: "repetidos",
        winnersLabel: "Vencedores",
        noResult: "Sem sorteio",
        latestResultReady: "Último sorteio pronto",
        emptyStateTitle: "Tudo pronto para começar",
        emptyStateText: "Quando você executar o sorteio, os vencedores numerados aparecerão aqui e você poderá copiá-los ou exportá-los.",
        resultPlaceholder: "Ainda não há um sorteio realizado",
        resultHelp: "O resultado é gerado automaticamente e fica bloqueado para evitar alterações manuais.",
        historyLabel: "Histórico de vencedores excluídos",
        historyEmpty: "Ainda não há vencedores anteriores excluídos.",
        copyButton: "Copiar resultado",
        exportButton: "Exportar TXT",
        clearHistoryButton: "Limpar histórico",
        footerText: "Criado por E.G.",
        confirmTitle: "Confirmar ação",
        confirmCancelButton: "Cancelar",
        confirmAcceptButton: "Continuar",
        participantSingle: "participante",
        participantPlural: "participantes",
        duplicatesMetric: "repetidos",
        availableMetric: "disponíveis",
        invalidPrizeCount: "A quantidade de prêmios é inválida.",
        validation_no_participants: "Adicione pelo menos um participante para realizar o sorteio.",
        validation_invalid_prize_count: "A quantidade de prêmios deve estar entre 1 e 100.",
        validation_no_eligible_participants: "Não há participantes disponíveis com as opções atuais.",
        validation_too_many_prizes: "A quantidade de prêmios não pode superar os participantes disponíveis.",
        raffleDone: "Sorteio realizado com sucesso.",
        rerollNeedParticipants: "Adicione participantes primeiro para poder sortear novamente.",
        rerollDone: "Novo sorteio gerado.",
        noResultToCopy: "Ainda não há resultado para copiar.",
        copiedResult: "Resultado copiado para a área de transferência.",
        copyFailed: "Não foi possível copiar o resultado.",
        noResultToExport: "Ainda não há resultado para exportar.",
        exportedResult: "Resultado exportado em TXT.",
        noDuplicatesToClean: "Não há participantes repetidos para limpar.",
        duplicatesRemoved: "Os participantes repetidos foram removidos.",
        clearHistoryConfirm: "Isso vai limpar o histórico de vencedores excluídos. Esses nomes poderão ser usados novamente nos próximos sorteios.",
        clearHistoryDone: "O histórico de vencedores excluídos foi limpo.",
        resetConfirm: "Isso vai limpar participantes, resultado e opções ativas. Esta ação não pode ser desfeita.",
        resetDone: "Formulário reiniciado.",
        winnerSingle: "Vencedor",
        prizePrefix: "Prêmio",
    },
};

const {
    MIN_PRIZES,
    sanitizePrizeCount,
    parseParticipants,
    getDuplicateEntries,
    dedupeParticipants,
    buildEligibleParticipants,
    validateRaffle,
    pickWinners,
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
const descriptionMeta = document.querySelector('meta[name="description"]');
const langButtons = document.querySelectorAll("[data-lang]");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroCopy = document.getElementById("heroCopy");
const formHeading = document.getElementById("formHeading");
const formSubheading = document.getElementById("formSubheading");
const prizeLabel = document.getElementById("prizeLabel");
const prizeHelp = document.getElementById("prizeHelp");
const participantsLabel = document.getElementById("participantsLabel");
const participantsHelp = document.getElementById("participantsHelp");
const advancedOptionsSummary = document.getElementById("advancedOptionsSummary");
const excludePreviousLabel = document.getElementById("excludePreviousLabel");
const autoRemoveDuplicatesLabel = document.getElementById("autoRemoveDuplicatesLabel");
const drawButton = document.getElementById("drawButton");
const rerollButtonLabel = document.getElementById("rerollButton");
const resetButtonLabel = document.getElementById("resetButton");
const resultHeading = document.getElementById("resultHeading");
const resultSubheading = document.getElementById("resultSubheading");
const summaryPrizesLabel = document.getElementById("summaryPrizesLabel");
const summaryParticipantsLabel = document.getElementById("summaryParticipantsLabel");
const summaryDuplicatesLabel = document.getElementById("summaryDuplicatesLabel");
const winnersLabel = document.getElementById("winnersLabel");
const emptyStateTitle = document.getElementById("emptyStateTitle");
const emptyStateText = document.getElementById("emptyStateText");
const resultHelp = document.getElementById("resultHelp");
const historyLabel = document.getElementById("historyLabel");
const footerText = document.getElementById("footerText");
const confirmTitle = document.getElementById("confirmTitle");

let toastTimeoutId;
let drawAnimationTimeoutId;
let pendingConfirmationResolve;

const state = {
    language: "es",
    previousWinners: [],
    lastUsedParticipants: [],
};

function t(key) {
    return I18N[state.language][key] ?? I18N.es[key] ?? key;
}

function loadLanguage() {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (savedLanguage && I18N[savedLanguage]) {
        state.language = savedLanguage;
    }
}

function persistLanguage() {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
}

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

function applyTranslations() {
    document.documentElement.lang = state.language;
    document.title = "Sorteo Simple";
    descriptionMeta.setAttribute("content", t("pageDescription"));
    heroEyebrow.textContent = t("heroEyebrow");
    heroCopy.textContent = t("heroCopy");
    formHeading.textContent = t("formHeading");
    formSubheading.textContent = t("formSubheading");
    prizeLabel.textContent = t("prizeLabel");
    prizeHelp.textContent = t("prizeHelp");
    participantsLabel.textContent = t("participantsLabel");
    participantsInput.placeholder = t("participantsPlaceholder");
    participantsHelp.textContent = t("participantsHelp");
    removeDuplicatesButton.textContent = t("removeDuplicatesButton");
    advancedOptionsSummary.textContent = t("advancedOptionsSummary");
    excludePreviousLabel.textContent = t("excludePreviousLabel");
    autoRemoveDuplicatesLabel.textContent = t("autoRemoveDuplicatesLabel");
    drawButton.textContent = t("drawButton");
    rerollButtonLabel.textContent = t("rerollButton");
    resetButtonLabel.textContent = t("resetButton");
    resultHeading.textContent = t("resultHeading");
    resultSubheading.textContent = t("resultSubheading");
    summaryPrizesLabel.textContent = t("summaryPrizesLabel");
    summaryParticipantsLabel.textContent = t("summaryParticipantsLabel");
    summaryDuplicatesLabel.textContent = t("summaryDuplicatesLabel");
    winnersLabel.textContent = t("winnersLabel");
    emptyStateTitle.textContent = t("emptyStateTitle");
    emptyStateText.textContent = t("emptyStateText");
    resultOutput.placeholder = t("resultPlaceholder");
    resultHelp.textContent = t("resultHelp");
    historyLabel.textContent = t("historyLabel");
    copyButton.textContent = t("copyButton");
    exportButton.textContent = t("exportButton");
    clearHistoryButton.textContent = t("clearHistoryButton");
    footerText.textContent = t("footerText");
    confirmTitle.textContent = t("confirmTitle");
    confirmCancelButton.textContent = t("confirmCancelButton");
    confirmAcceptButton.textContent = t("confirmAcceptButton");

    langButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.lang === state.language);
    });
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

function translateValidationMessage(validation) {
    if (!validation || validation.valid || !validation.code) {
        return "";
    }

    return t(`validation_${validation.code}`) || validation.message;
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
        chips.push(`<span class="meta-chip warning">${duplicateCount} ${t("duplicatesMetric")}</span>`);
    }

    if (excludePreviousWinnersInput.checked && state.previousWinners.length > 0) {
        chips.push(`<span class="meta-chip">${overview.eligibleParticipants.length} ${t("availableMetric")}</span>`);
    }

    participantsMetrics.innerHTML = chips.join("");
}

function updateSummary() {
    const prizes = sanitizePrizeCount(prizesInput.value);
    const overview = getParticipantsOverview();
    const total = overview.participants.length;
    const label = total === 1 ? t("participantSingle") : t("participantPlural");
    const duplicateEntriesCount = overview.duplicates.reduce((totalDuplicates, duplicate) => {
        return totalDuplicates + duplicate.count - 1;
    }, 0);

    participantsCounter.textContent = `${total} ${label}`;
    summaryPrizes.textContent = String(prizes);
    summaryParticipants.textContent = String(overview.eligibleParticipants.length);
    summaryDuplicateParticipants.textContent = String(duplicateEntriesCount);
    historyText.textContent = state.previousWinners.length
        ? state.previousWinners.join(", ")
        : t("historyEmpty");
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
    resultBadge.textContent = hasResult ? t("latestResultReady") : t("noResult");
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

function formatLocalizedWinners(winners) {
    return winners
        .map((winner, index) => `${t("prizePrefix")} ${index + 1}: ${winner}`)
        .join("\n");
}

function renderWinnerReveal(winners) {
    if (!winners.length) {
        winnerReveal.innerHTML = "";
        winnerReveal.classList.remove("has-winners");
        return;
    }

    winnerReveal.classList.add("has-winners");
    winnerReveal.innerHTML = winners.map((winner, index) => {
        const label = winners.length === 1 ? t("winnerSingle") : `${t("prizePrefix")} ${index + 1}`;
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

    setFieldError(prizeError, prizesInput, prizes >= MIN_PRIZES ? "" : t("invalidPrizeCount"));
    setFieldError(
        participantsError,
        participantsInput,
        validation.valid ? "" : translateValidationMessage(validation),
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

function setLanguage(language) {
    if (!I18N[language]) {
        return;
    }

    state.language = language;
    persistLanguage();
    applyTranslations();
    if (resultOutput.value.trim()) {
        resultOutput.value = formatLocalizedWinners(extractWinnersFromResultText(resultOutput.value));
    }
    validateFormForUI();
    updateSummary();
    renderResultState(Boolean(resultOutput.value.trim()));
    renderWinnerReveal(extractWinnersFromResultText(resultOutput.value));
    syncPanelTopHeights();
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
        showToast(translateValidationMessage(validation), "error");
        return false;
    }

    const excludedParticipants = excludePreviousWinnersInput.checked ? state.previousWinners : [];
    const winners = pickWinners(sourceParticipants, prizes, excludedParticipants);
    resultOutput.value = formatLocalizedWinners(winners);
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
        toastMessage: t("raffleDone"),
    });
}

function handleReroll() {
    const overview = getParticipantsOverview();

    if (overview.uniqueParticipants.length === 0) {
        showToast(t("rerollNeedParticipants"), "warning");
        return;
    }

    if (state.lastUsedParticipants.length === 0) {
        state.lastUsedParticipants = autoRemoveDuplicatesInput.checked ? overview.uniqueParticipants : overview.participants;
    }

    performRaffle({
        useCurrentText: false,
        toastMessage: t("rerollDone"),
    });
}

async function handleCopy() {
    if (!resultOutput.value.trim()) {
        showToast(t("noResultToCopy"), "warning");
        return;
    }

    try {
        await navigator.clipboard.writeText(resultOutput.value);
        showToast(t("copiedResult"), "success");
    } catch (error) {
        console.error(error);
        showToast(t("copyFailed"), "error");
    }
}

function handleExport() {
    if (!resultOutput.value.trim()) {
        showToast(t("noResultToExport"), "warning");
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

    showToast(t("exportedResult"), "success");
}

function handleRemoveDuplicates() {
    const participants = getCurrentParticipants();
    const uniqueParticipants = dedupeParticipants(participants);

    if (participants.length === uniqueParticipants.length) {
        showToast(t("noDuplicatesToClean"), "warning");
        return;
    }

    participantsInput.value = uniqueParticipants.join("\n");
    validateFormForUI();
    updateSummary();
    showToast(t("duplicatesRemoved"), "success");
}

async function handleClearHistory() {
    const confirmed = await requestConfirmation(t("clearHistoryConfirm"));

    if (!confirmed) {
        return;
    }

    state.previousWinners = [];
    validateFormForUI();
    updateSummary();
    showToast(t("clearHistoryDone"), "success");
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

    const confirmed = await requestConfirmation(t("resetConfirm"));

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
        showToast(t("resetDone"), "success");
    });
}

loadLanguage();
loadState();
applyTranslations();
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
langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});
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
