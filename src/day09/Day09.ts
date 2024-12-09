// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { lines } from "@utils/util.ts";

/**
 * The solution for Day 09.
 */
export class Day09 extends AdventOfCodeDay {
    constructor() {
        super(9);
    }

    checksum(blocks: string[]) {
        let sum = 0;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] === ".") {
                continue;
            }
            sum += parseInt(blocks[i]) * i;
        }
        return sum;
    }
    blockLayout(diskMap: string) {
        const result: string[] = [];
        _.chunk(diskMap, 2).forEach(([blocksize, freespacesize], i) => {
            // result.push(`${i}`.repeat(parseInt(blocksize)));
            // result.push(".".repeat(parseInt(freespacesize)));
            for (let j = 0; j < parseInt(blocksize); j++) {
                result.push(`${i}`);
            }
            for (let j = 0; j < parseInt(freespacesize); j++) {
                result.push(".");
            }
        });
        return result;
    }

    defrag(blocks: string[]) {
        const newBlocks = _.clone(blocks);
        let lastBlockIdx = newBlocks.length - 1;
        for (let i = 0; i < newBlocks.length; i++) {
            if (newBlocks[i] !== ".") {
                continue;
            }
            while (newBlocks[lastBlockIdx] === "." && lastBlockIdx > i) {
                lastBlockIdx--;
            }
            // swap
            const tmp = newBlocks[i];
            newBlocks[i] = newBlocks[lastBlockIdx];
            newBlocks[lastBlockIdx] = tmp;
        }
        return newBlocks;
    }

    defrag2(blocks: string[]) {
        const newBlocks = _.clone(blocks);
        for (let lastBlockIdx = newBlocks.length - 1; lastBlockIdx >= 0; lastBlockIdx--) {
            if (newBlocks[lastBlockIdx] === ".") {
                continue;
            }
            const maxI = lastBlockIdx;
            const blockID = newBlocks[lastBlockIdx];
            while (newBlocks[lastBlockIdx] === blockID && lastBlockIdx >= 0) {
                lastBlockIdx--;
            }
            lastBlockIdx++;
            const minI = lastBlockIdx;
            const size = maxI - minI + 1;
            // find free spot large enough
            let freeSpotCount = 0;
            let freeSpotIdx = -1;
            for (let i = 0; i < minI; i++) {
                freeSpotCount = newBlocks[i] === "." ? freeSpotCount + 1 : 0;
                if (freeSpotCount === size) {
                    freeSpotIdx = i - size + 1;
                    break;
                }
            }
            if (freeSpotIdx === -1) {
                continue;
            }
            // move block
            for (let i = 0; i < size; i++) {
                newBlocks[freeSpotIdx + i] = newBlocks[minI + i];
                newBlocks[minI + i] = ".";
            }
        }
        return newBlocks;
    }

    solvePart1(input: string): string {
        return this.checksum(this.defrag(this.blockLayout(lines(input)[0]))).toString();
    }

    solvePart2(input: string): string {
        return this.checksum(this.defrag2(this.blockLayout(lines(input)[0]))).toString();
    }
}

if (import.meta.main) {
    const day = new Day09();
    day.run();
}
