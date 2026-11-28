import { expect, test, describe } from "vitest";
import parseArgs from "../src/parser.js";

describe("parseArgs", () => {
    describe("returns object when", () => {
        test("required flag and value", () => {
            const commands = [
                "--inntekt",
                "100000"
            ]
            
            const expected = { inntekt: 100000, fradrag: 0 }
            const data = parseArgs(commands);

            expect(data).toEqual(expected);
        });

        test("+ optional flag and value", () => {
            const commands = [
                "--inntekt",
                "100000",
                "--renter",
                "50000",
                "--reisefradrag",
                "3000"
            ]

            const expected = { inntekt: 100000, fradrag: 53000 }
            const data = parseArgs(commands);

            expect(data).toEqual(expected);
        });
    });

    describe("throws error when", () => {
        test("the required flag is missing", () => {
            const commands = [
                "--renter",
                "50000"
            ];

            expect(() => parseArgs(commands)).toThrow("Mangler");
        });

        test("a flag is not in the data structure", () => {
            const commands = [
                "--inntekt",
                "100000",
                "--renterr",
                "50000"
            ];

            expect(() => parseArgs(commands)).toThrow("Ukjent");
        });

        test("the value of a flag is negative", () => {
            const commands = [
                "--inntekt",
                "-50000"
            ];

            expect(() => parseArgs(commands)).toThrow("tall");
        });

        test("the value of a flag is NaN", () => {
            const commands = [
                "--inntekt",
                "abc"
            ];

            expect(() => parseArgs(commands)).toThrow("tall");
        });

        test("no arguments are provided", () => {
            expect(() => parseArgs([])).toThrow("Mangler");
        });

        test("the last flag has no value", () => {
            const commands = [
                "--inntekt",
                "100000",
                "--renter"
            ];

            expect(() => parseArgs(commands)).toThrow("Bruk");
        });

        test("the value of a flag is skipped", () => {
            const commands = [
                "--inntekt",
                "--renter",
                "50000"
            ];

            expect(() => parseArgs(commands)).toThrow("tall");
        });

        test("there's two values after each other and no flag", () => {
            const commands = [
                "--inntekt",
                "100000",
                "50000"
            ];

            expect(() => parseArgs(commands)).toThrow("Bruk");
        });
    })
});
