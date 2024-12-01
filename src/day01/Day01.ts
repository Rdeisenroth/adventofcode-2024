// @deno-types="@types/lodash"
import _ from "lodash";
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 1.
 */
export class Day01 extends AdventOfCodeDay {
    constructor() {
        super(1);
    }

    solvePart1(input: string): string {
        throw new Error("Method not implemented.");
    }

    solvePart2(input: string): string {
        throw new Error("Method not implemented.");
    }
}

if (import.meta.main) {
    const day = new Day01();
    day.run();
}
