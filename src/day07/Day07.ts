import { lines } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

type Equation = {
    verify: number;
    nums: number[];
}

/**
 * The solution for Day 07.
 */
export class Day07 extends AdventOfCodeDay {
    constructor() {
        super(7);
    }

    parse(input: string): Equation[] {
        return lines(input).map(l => {
            const [verify, nums] = l.split(":");
            return {
                verify: parseInt(verify.trim()),
                nums: nums.trim().split(" ").map(n => parseInt(n))
            }
        })
    }

    operations: ((a: number, b: number) => number)[] = [
        (a, b) => a + b,
        (a, b) => a * b,
    ]

    verifyEquationPossibleBacktrack(equation: Equation, index: number, current: number): boolean {
        if (index === equation.nums.length) {
            return current === equation.verify;
        }
        for (const op of this.operations) {
            if (this.verifyEquationPossibleBacktrack(equation, index + 1, op(current, equation.nums[index]))) {
                return true;
            }
        }
        return false;
    }

    verifyEquationPossible(equation: Equation): boolean {
        if (equation.nums.length === 1) {
            return equation.nums[0] === equation.verify;
        }
        return this.verifyEquationPossibleBacktrack(equation, 1, equation.nums[0]);
    }

    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        const equations = this.parse(input);
        const valid = equations.filter(e => this.verifyEquationPossible(e));
        return valid.map(e => e.verify).reduce((a, b) => a + b, 0).toString();
    }

    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        throw new Error("Method not implemented.");
    }
}

if (import.meta.main) {
    const day = new Day07();
    day.run();
}
