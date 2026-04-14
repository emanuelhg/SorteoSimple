const assert = require("node:assert/strict");
const {
    sanitizePrizeCount,
    parseParticipants,
    getDuplicateEntries,
    dedupeParticipants,
    buildEligibleParticipants,
    validateRaffle,
    pickWinners,
    formatWinners,
} = require("../raffle-core.js");

function testSanitizePrizeCount() {
    assert.equal(sanitizePrizeCount(""), 1);
    assert.equal(sanitizePrizeCount("0"), 1);
    assert.equal(sanitizePrizeCount("105"), 100);
    assert.equal(sanitizePrizeCount("12abc"), 12);
}

function runTest(name, testFn) {
    testFn();
    console.log(`OK ${name}`);
}

function testParseAndDeduplication() {
    const participants = parseParticipants("Ana\n\nJuan \n Ana\n");

    assert.deepEqual(participants, ["Ana", "Juan", "Ana"]);
    assert.deepEqual(dedupeParticipants(participants), ["Ana", "Juan"]);
    assert.deepEqual(getDuplicateEntries(participants), [{ name: "Ana", count: 2 }]);
}

function testEligibleParticipants() {
    const eligible = buildEligibleParticipants(
        ["Ana", "Juan", "Pedro"],
        ["Juan"],
        true,
    );

    assert.deepEqual(eligible, ["Ana", "Pedro"]);
}

function testValidation() {
    const invalidByCount = validateRaffle({
        participants: ["Ana"],
        prizeCount: 2,
        previousWinners: [],
        excludePreviousWinners: false,
    });
    const invalidByExclusion = validateRaffle({
        participants: ["Ana"],
        prizeCount: 1,
        previousWinners: ["Ana"],
        excludePreviousWinners: true,
    });
    const valid = validateRaffle({
        participants: ["Ana", "Juan"],
        prizeCount: 1,
        previousWinners: [],
        excludePreviousWinners: false,
    });

    assert.equal(invalidByCount.valid, false);
    assert.equal(invalidByExclusion.valid, false);
    assert.equal(valid.valid, true);
}

function testPickWinnersAndFormat() {
    const winners = pickWinners(["Ana", "Juan", "Pedro"], 2, ["Pedro"]);

    assert.equal(winners.length, 2);
    assert.ok(winners.every((winner) => ["Ana", "Juan"].includes(winner)));
    assert.match(formatWinners(["Ana"]), /Premio 1: Ana/);
}

function testPickWinnersRespectsExcludedPreviousWinners() {
    const winners = pickWinners(["Ana", "Juan", "Pedro"], 1, ["Ana", "Juan"]);

    assert.deepEqual(winners, ["Pedro"]);
}

function run() {
    runTest("sanitizePrizeCount", testSanitizePrizeCount);
    runTest("parseAndDeduplication", testParseAndDeduplication);
    runTest("eligibleParticipants", testEligibleParticipants);
    runTest("validation", testValidation);
    runTest("pickWinnersAndFormat", testPickWinnersAndFormat);
    runTest("pickWinnersRespectsExcludedPreviousWinners", testPickWinnersRespectsExcludedPreviousWinners);
    console.log("All raffle core tests passed.");
}

run();
