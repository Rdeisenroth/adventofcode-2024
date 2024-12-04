import { lines } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 04.
 */
export class Day04 extends AdventOfCodeDay {
    constructor() {
        super(4);
    }

    rotateVector(x: number, y: number, angle: number): [number, number] {
        const rad = angle * Math.PI / 180;
        return [
            Math.round(x * Math.cos(rad) - y * Math.sin(rad)),
            Math.round(x * Math.sin(rad) + y * Math.cos(rad)),
        ];
    }

    solvePart1(input: string): string {
        // search xmas like kreuzworträtsel
        const toSearch = "XMAS";
        let count = 0;
        const grid: string[][] = lines(input).map((line) => line.split(""));
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] !== toSearch[0]) {
                    continue;
                }
                const dirs: [number, number][] = [
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0],
                    [-1, -1],
                    [0, -1],
                    [1, -1],
                ];
                for (const dir of dirs) {
                    const [dx, dy] = dir;
                    for (let j = 1; j < toSearch.length; j++) {
                        if (grid[y + dy * j]?.[x + dx * j] !== toSearch[j]) {
                            break;
                        }
                        if (j === toSearch.length - 1) {
                            count++;
                        }
                    }
                }
            }
        }
        return count.toString();
    }

    solvePart2(input: string): string {
        // search X-Pattern MAS String
        let count = 0;
        const grid: string[][] = lines(input).map((line) => line.split(""));
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] !== "A") {
                    continue;
                }

                const dirs: [number, number][] = [
                    [1, 1],
                    [-1, 1],
                    [-1, -1],
                    [1, -1],
                ];

                for (const dir of dirs) {
                    const [dx, dy] = dir;
                    if (grid[y + dy]?.[x + dx] !== "M" || grid[y - dy]?.[x - dx] !== "S") {
                        continue;
                    }
                    // rotate 90 to the right
                    const rotatedDir: [number, number] = [dy, -dx];
                    if (grid[y + rotatedDir[1]]?.[x + rotatedDir[0]] === "M" && grid[y - rotatedDir[1]]?.[x - rotatedDir[0]] === "S") {
                        count++;
                        break;
                    }
                }
            }
        }
        return count.toString();
    }
}

if (import.meta.main) {
    const day = new Day04();
    day.run();
}
