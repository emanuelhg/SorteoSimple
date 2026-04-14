(function (globalScope) {
    const MIN_PRIZES = 1;
    const MAX_PRIZES = 100;

    function sanitizePrizeCount(rawValue) {
        const digitsOnly = String(rawValue).replace(/[^\d]/g, "");

        if (digitsOnly === "") {
            return MIN_PRIZES;
        }

        const parsedValue = Number.parseInt(digitsOnly, 10);
        return Math.min(MAX_PRIZES, Math.max(MIN_PRIZES, parsedValue));
    }

    function parseParticipants(rawText) {
        return String(rawText)
            .split("\n")
            .map((entry) => entry.trim())
            .filter(Boolean);
    }

    function getDuplicateEntries(participants) {
        const counts = new Map();

        participants.forEach((participant) => {
            counts.set(participant, (counts.get(participant) || 0) + 1);
        });

        return Array.from(counts.entries())
            .filter(([, count]) => count > 1)
            .map(([name, count]) => ({ name, count }))
            .sort((left, right) => left.name.localeCompare(right.name));
    }

    function dedupeParticipants(participants) {
        return Array.from(new Set(participants));
    }

    function buildEligibleParticipants(participants, previousWinners, excludePreviousWinners) {
        if (!excludePreviousWinners) {
            return [...participants];
        }

        const excluded = new Set(previousWinners);
        return participants.filter((participant) => !excluded.has(participant));
    }

    function validateRaffle(options) {
        const {
            participants,
            prizeCount,
            previousWinners = [],
            excludePreviousWinners = false,
        } = options;
        const uniqueParticipants = dedupeParticipants(participants);

        if (participants.length === 0) {
            return { valid: false, message: "Ingresa al menos un participante para realizar el sorteo." };
        }

        if (prizeCount < MIN_PRIZES || prizeCount > MAX_PRIZES) {
            return { valid: false, message: "La cantidad de premios debe estar entre 1 y 100." };
        }

        const eligibleParticipants = buildEligibleParticipants(
            uniqueParticipants,
            previousWinners,
            excludePreviousWinners,
        );

        if (eligibleParticipants.length === 0) {
            return { valid: false, message: "No quedan participantes disponibles con las opciones actuales." };
        }

        if (prizeCount > eligibleParticipants.length) {
            return {
                valid: false,
                message: "La cantidad de premios no puede superar a los participantes disponibles.",
            };
        }

        return { valid: true, message: "" };
    }

    function pickWinners(participants, prizeCount, excludedParticipants) {
        const excluded = new Set(excludedParticipants || []);
        const available = dedupeParticipants(participants).filter((participant) => !excluded.has(participant));
        const shuffled = [...available];

        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }

        return shuffled.slice(0, prizeCount);
    }

    function formatWinners(winners) {
        return winners.map((winner, index) => `Premio ${index + 1}: ${winner}`).join("\n");
    }

    const api = {
        MIN_PRIZES,
        MAX_PRIZES,
        sanitizePrizeCount,
        parseParticipants,
        getDuplicateEntries,
        dedupeParticipants,
        buildEligibleParticipants,
        validateRaffle,
        pickWinners,
        formatWinners,
    };

    globalScope.RaffleCore = api;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
}(typeof window !== "undefined" ? window : globalThis));
