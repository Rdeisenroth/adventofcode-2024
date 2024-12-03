// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 03.
 */
export class Day03 extends AdventOfCodeDay {
    constructor() {
        super(3);
    }

    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        const mulReg = /mul\((?<m1>\d+),(?<m2>\d+)\)/g;
        const mulMatches = [...input.matchAll(mulReg)];
        return mulMatches.map((match) => {
            return Number(match.groups!.m1) * Number(match.groups!.m2);
        }).reduce((acc, val) => acc + val, 0).toString();
    }

    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        const insReg = /(?<mul>mul\((?<m1>\d+),(?<m2>\d+)\))|(?<do>do\(\))|(?<dont>don\'t\(\))/g;
        const mulMatches = [...input.matchAll(insReg)];
        let enabled = true;
        let sum = 0;
        mulMatches.forEach((match) => {
            if (match.groups!.do) {
                enabled = true;
            } else if (match.groups!.dont) {
                enabled = false;
            } else if (match.groups!.mul && enabled) {
                sum += Number(match.groups!.m1) * Number(match.groups!.m2);
            }
        });
        return sum.toString();
    }
}

if (import.meta.main) {
    const day = new Day03();
    day.run();
}
