// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { lines } from "@utils/util.ts";

type MStone = {
    num: number;
    midx: number;
}

/**
 * The solution for Day 11.
 */
export class Day11 extends AdventOfCodeDay {
    constructor() {
        super(11);
    }

    blink(stones: number[]): number[] {
        return stones.flatMap(stone => {
            const len = `${stone}`.length;
            return stone == 0 ? [1]
                : len % 2 == 0 ? _.chunk(`${stone}`, len / 2).map(x => x.join("")).map(Number)
                    : [stone * 2024];
        })
    }

    blinkCountMemoisation(stones: number[], count: number): number {
        let mstones: MStone[] = stones.map(x => ({ num: x, midx: -1 }));
        const memo: Record<number, MStone[][]> = {};
        for (let i = 0; i < count; i++) {
            for (const mstone of mstones) {
                if (mstone.midx == -1) {
                    // check if we have seen this stone before
                    const memoStone = memo[mstone.num];
                    if (memoStone) {

                    }
                    mstone.midx++;
                }
            }
        }
        return stones.length;
    }

    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        let stones = input.trim().split(" ").map(Number);
        for (let i = 0; i < 25; i++) {
            stones = this.blink(stones);
        }
        return `${stones.length}`;
    }

    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        let stones = input.trim().split(" ").map(Number);
        for (let i = 0; i < 75; i++) {
            console.log(`Progress: ${i}/75, stones: ${stones.length}`);
            stones = this.blink(stones);
        }
        return `${stones.length}`;
    }
}

if (import.meta.main) {
    const day = new Day11();
    day.run();
}
