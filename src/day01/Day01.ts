// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 1.
 */
export class Day01 extends AdventOfCodeDay {
    constructor() {
        super(1);
    }
    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        throw new Error("Method not implemented.");
    }
    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        throw new Error("Method not implemented.");
    }
}

if (import.meta.main) {
    const day = new Day01();
    day.run();
}
