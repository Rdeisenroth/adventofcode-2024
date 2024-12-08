// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { isValidCoordinate, type Point } from "@utils/util.ts";
import { lines } from "@utils/util.ts";

/**
 * The solution for Day 08.
 */
export class Day08 extends AdventOfCodeDay {
    constructor() {
        super(8);
    }

    solvePart1(input: string): string {
        const antennae: Map<string, Point[]> = new Map();
        const iLines = lines(input);
        for (let y = 0; y < iLines.length; y++) {
            const line = iLines[y];
            for (let x = 0; x < line.length; x++) {
                const letter = line.charAt(x);
                if (letter === ".") {
                    continue;
                }
                if (!antennae.has(letter)) {
                    antennae.set(letter, []);
                }
                antennae.get(letter)!.push({ x, y });
            }
        }
        const antinodes: Set<`${number},${number}`> = new Set();
        // deno-lint-ignore no-unused-vars
        for (const [letter, positions] of antennae.entries()) {
            for (const [p1, p2] of positions.flatMap((p1, i) => positions.slice(i + 1).map((p2) => [p1, p2]))) {
                const vector = { x: p2.x - p1.x, y: p2.y - p1.y };
                const vector2 = { x: vector.x * 2, y: vector.y * 2 };
                const p3 = { x: p1.x + vector2.x, y: p1.y + vector2.y };
                if (isValidCoordinate(p3, iLines[0].length, iLines.length)) {
                    antinodes.add(`${p3.x},${p3.y}`);
                }
                const p4 = { x: p2.x - vector2.x, y: p2.y - vector2.y };
                if (isValidCoordinate(p4, iLines[0].length, iLines.length)) {
                    antinodes.add(`${p4.x},${p4.y}`);
                }
            }
        }
        return antinodes.size.toString();
    }
    solvePart2(input: string): string {
        const antennae: Map<string, Point[]> = new Map();
        const iLines = lines(input);
        for (let y = 0; y < iLines.length; y++) {
            const line = iLines[y];
            for (let x = 0; x < line.length; x++) {
                const letter = line.charAt(x);
                if (letter === ".") {
                    continue;
                }
                if (!antennae.has(letter)) {
                    antennae.set(letter, []);
                }
                antennae.get(letter)!.push({ x, y });
            }
        }
        const antinodes: Set<`${number},${number}`> = new Set();
        // deno-lint-ignore no-unused-vars
        for (const [letter, positions] of antennae.entries()) {
            for (const [p1, p2] of positions.flatMap((p1, i) => positions.slice(i + 1).map((p2) => [p1, p2]))) {
                antinodes.add(`${p1.x},${p1.y}`);
                antinodes.add(`${p2.x},${p2.y}`);
                const vector = { x: p2.x - p1.x, y: p2.y - p1.y };
                let p = { x: p2.x + vector.x, y: p2.y + vector.y };
                while (isValidCoordinate(p, iLines[0].length, iLines.length)) {
                    antinodes.add(`${p.x},${p.y}`);
                    p = { x: p.x + vector.x, y: p.y + vector.y };
                }
                p = { x: p1.x - vector.x, y: p1.y - vector.y };
                while (isValidCoordinate(p, iLines[0].length, iLines.length)) {
                    antinodes.add(`${p.x},${p.y}`);
                    p = { x: p.x - vector.x, y: p.y - vector.y };
                }
            }
        }
        return antinodes.size.toString();
    }
}

if (import.meta.main) {
    const day = new Day08();
    day.run();
}
