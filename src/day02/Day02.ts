import { lines } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 02.
 */
export class Day02 extends AdventOfCodeDay {
    constructor() {
        super(2);
    }

    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        const res = lines(input).map(l => {
            const nums = l.split(" ").map(n => parseInt(n));
            if(nums.length < 2) {
                return true;
            }
            const inc = nums[1] > nums[0];
            for(let i = 1; i < nums.length; i++) {
                const isInc = nums[i] > nums[i-1];
                const distance = Math.abs(nums[i] - nums[i-1]);
                if(isInc !== inc || distance > 3 || distance < 1) {
                    return false;
                }
            }
            return true;
        }).filter(b => b).length;
        return res.toString();
    }

    check(nums: number[]): boolean {
        if (nums.length < 2) {
            return true;
        }
        const inc = nums[1] > nums[0];
        for (let i = 1; i < nums.length; i++) {
            const isInc = nums[i] > nums[i - 1];
            const distance = Math.abs(nums[i] - nums[i - 1]);
            if (isInc !== inc || distance > 3 || distance < 1) {
                return false;
            }
        }
        return true;
    }

    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        const res = lines(input).map(l => {
            const nums = l.split(" ").map(n => parseInt(n));
            if (this.check(nums)) {
                return true;
            }
            for(let i = 0; i < nums.length; i++) {
                const newNums = [...nums];
                newNums.splice(i, 1);
                if(this.check(newNums)) {
                    return true;
                }
            }
            return false;
        }).filter(b => b).length;
        return res.toString();
    }
}

if (import.meta.main) {
    const day = new Day02();
    day.run();
}
