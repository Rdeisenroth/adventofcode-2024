// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

type MStone = {
    num: number;
    midx: number;
};

/**
 * The solution for Day 11.
 */
export class Day11 extends AdventOfCodeDay {
    constructor() {
        super(11);
    }

    blink(stones: number[]): number[] {
        return stones.flatMap((stone) => {
            const len = `${stone}`.length;
            return stone == 0 ? [1] : len % 2 == 0 ? _.chunk(`${stone}`, len / 2).map((x) => x.join("")).map(Number) : [stone * 2024];
        });
    }

    blinkNTimes(stone: number, count: number): number {
        return this.blinkNTimesHelper(stone, count, _.range(count + 1).map(() => new Map<number, number>()));
    }

    blinkNTimesHelper(stone: number, count: number, cache: Map<number, number>[]): number {
        if (cache[count].has(stone)) {
            return cache[count].get(stone)!;
        }
        let res = stone;
        if (count === 1) {
            res = this.blink([stone]).length;
        } else if (count > 1) {
            res = this.blink([stone]).map((s2) => this.blinkNTimesHelper(s2, count - 1, cache)).reduce((acc, x) => acc + x);
        }
        cache[count].set(stone, res);
        return res;
    }

    solvePart1(input: string): string {
        let stones = input.trim().split(" ").map(Number);
        for (let i = 0; i < 25; i++) {
            stones = this.blink(stones);
        }
        return `${stones.length}`;
    }

    solvePart2(input: string): string {
        const stones = input.trim().split(" ").map(Number);
        return stones.map((stone) => this.blinkNTimes(stone, 75)).reduce((acc, x) => acc + x).toString();
    }
}

if (import.meta.main) {
    const day = new Day11();
    day.run();
}
