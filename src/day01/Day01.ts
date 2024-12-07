import { lines } from "@utils/util.ts";
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
    solvePart1(input: string): string {
        const left: number[] = [];
        const right: number[] = [];
        lines(input).map((line) => line.split(/\s+/) as string[]).forEach((l) => {
            left.push(parseInt(l[0]));
            right.push(parseInt(l[1]));
        });
        // sort the left and right arrays in ascending order
        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 0; i < left.length; i++) {
            const distance = Math.abs(left[i] - right[i]);
            sum += distance;
        }
        return sum.toString();
    }
    solvePart2(input: string): string {
        const left: number[] = [];
        const right: number[] = [];
        lines(input).map((line) => line.split(/\s+/) as string[]).forEach((l) => {
            left.push(parseInt(l[0]));
            right.push(parseInt(l[1]));
        });
        let sum = 0;
        for (let i = 0; i < left.length; i++) {
            const l = left[i];
            const rAppearences = right.filter((r) => r === l).length;
            sum += l * rAppearences;
        }
        return sum.toString();
    }
}

if (import.meta.main) {
    const day = new Day01();
    day.runTest();
}
