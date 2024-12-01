import * as fs from "@std/fs";
/**
 * A class that represents a day in the Advent of Code challenge.
 */
export abstract class AdventOfCodeDay {
    /**
     * Creates a new challenge day instance.
     * @param day The day number (will get padded for input paths).
     */
    constructor(readonly day: number) {}

    /**
     * Gets the path to the input file for this day for either test or real data, and for either part 1 or part 2.
     * @param test true if the test input is requested, false for the real input. Default is false.
     * @param part The part number (1 or 2). Default is 1.
     * @returns The path to the input file.
     */
    public getInputPath(test = false, part = 1): string {
        const base = `./data${test ? "_test" : ""}/day${`${this.day}`.padStart(2, "0")}`;
        let suffix = ".txt";
        if (part > 1) {
            if (fs.existsSync(`${base}_${part}${suffix}`)) {
                suffix = `_${part}${suffix}`;
            }
        }
        return `${base}${suffix}`;
    }

    /**
     * Gets the input data for this day.
     * @param test true if the test input is requested, false for the real input. Default is false.
     * @param part The part number (1 or 2). Default is 1.
     * @returns The input data as a string.
     * @see getInputPath
     */
    public getInput(test = false, part = 1): string {
        return Deno.readTextFileSync(this.getInputPath(test, part));
    }

    /**
     * Solves part 1 of the challenge.
     * @param input The input data as a string.
     */
    public abstract solvePart1(input: string): string;
    /**
     * Solves part 2 of the challenge.
     * @param input The input data as a string.
     */
    public abstract solvePart2(input: string): string;

    /**
     * Logs the result of a part of the challenge to the console.
     * @param part The part number (1 or 2).
     * @param result The result string.
     * @param test true if the test input was used, false for the real input.
     */
    private logDayPartResult(part: number, result: string, test: boolean) {
        console.log(`----Day ${this.day} part ${part} ${test ? "test" : ""}---- \n${result}`);
    }

    /**
     * runs the challenge for both parts. The output is logged to the console.
     */
    public run() {
        this.logDayPartResult(
            1,
            this.solvePart1(this.getInput(false, 1)),
            false,
        );
        this.logDayPartResult(
            2,
            this.solvePart2(this.getInput(false, 2)),
            false,
        );
    }
    /**
     * runs the challenge for both parts with test data. The output is logged to the console.
     */
    public runTest() {
        this.logDayPartResult(1, this.solvePart1(this.getInput(true, 1)), true);
        this.logDayPartResult(
            2,
            this.solvePart2(this.getInput(true, 2)),
            true,
        );
    }
}
