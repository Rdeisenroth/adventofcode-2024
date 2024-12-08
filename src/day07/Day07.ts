import { lines } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

type Equation = {
    verify: number;
    nums: number[];
};

/**
 * The solution for Day 07.
 */
export class Day07 extends AdventOfCodeDay {
    constructor() {
        super(7);
    }

    parse(input: string): Equation[] {
        return lines(input).map((l) => {
            const [verify, nums] = l.split(":");
            return {
                verify: parseInt(verify.trim()),
                nums: nums.trim().split(" ").map((n) => parseInt(n)),
            };
        });
    }

    verifyEquationPossibleBacktrack(equation: Equation, index: number, current: number, operations: ((a: number, b: number) => number)[]): boolean {
        if (index === equation.nums.length) {
            return current === equation.verify;
        }
        for (const op of operations) {
            if (this.verifyEquationPossibleBacktrack(equation, index + 1, op(current, equation.nums[index]), operations)) {
                return true;
            }
        }
        return false;
    }

    verifyEquationPossible(equation: Equation, operations: ((a: number, b: number) => number)[]): boolean {
        if (equation.nums.length === 1) {
            return equation.nums[0] === equation.verify;
        }
        return this.verifyEquationPossibleBacktrack(equation, 1, equation.nums[0], operations);
    }

    solvePart1(input: string): string {
        const equations = this.parse(input);
        const operations: ((a: number, b: number) => number)[] = [
            (a, b) => a + b,
            (a, b) => a * b,
        ];
        const valid = equations.filter((e) => this.verifyEquationPossible(e, operations));
        return valid.map((e) => e.verify).reduce((a, b) => a + b, 0).toString();
    }

    solvePart2(input: string): string {
        const equations = this.parse(input);
        const operations: ((a: number, b: number) => number)[] = [
            (a, b) => a + b,
            (a, b) => a * b,
            (a, b) => parseInt(`${a}${b}`),
        ];
        const valid = equations.filter((e) => this.verifyEquationPossible(e, operations));
        return valid.map((e) => e.verify).reduce((a, b) => a + b, 0).toString();
    }
}

if (import.meta.main) {
    const day = new Day07();
    day.run();
}
