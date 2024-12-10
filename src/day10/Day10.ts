// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { directions, findPositions, isInBounds, Point } from "@utils/util.ts";
import { move } from "@utils/util.ts";
import { lines } from "@utils/util.ts";

/**
 * The solution for Day 10.
 */
export class Day10 extends AdventOfCodeDay {
    constructor() {
        super(10);
    }

    parse(input: string): number[][] {
        return lines(input)
            .map((line) =>
                line.split("")
                    .map((c) => isNaN(parseInt(c)) ? -1 : parseInt(c))
            );
    }

    trailheadScore(map: number[][], startPos: Point): number {
        const curVal = map[startPos.y][startPos.x];
        const endPositions: Set<string> = new Set();
        const queue: [Point, number][] = [[startPos, curVal]];
        const visited: Set<string> = new Set();
        while (queue.length > 0) {
            const [pos, val] = queue.shift()!;
            if (visited.has(`${pos.x},${pos.y}`)) {
                continue;
            }
            const nextMoves = directions
                .map((d) => move(pos, d.dir))
                .filter((p) => isInBounds(p, map[0].length, map.length))
                .map((p) => [p, map[p.y][p.x]] as [Point, number])
                // deno-lint-ignore no-unused-vars
                .filter(([p, v]) => v === val + 1);
            for (const [p, v] of nextMoves) {
                if (v === 9) {
                    endPositions.add(`${p.x},${p.y}`);
                } else {
                    queue.push([p, v]);
                }
            }
        }
        return endPositions.size;
    }

    trailheadScore2(map: number[][], startPos: Point): number {
        const curVal = map[startPos.y][startPos.x];
        // const endPositions: Set<string> = new Set();
        const queue: [Point, number][] = [[startPos, curVal]];
        // const visited: Set<string> = new Set();
        let sum = 0;
        while (queue.length > 0) {
            const [pos, val] = queue.shift()!;
            // if (visited.has(`${pos.x},${pos.y}`)) {
            //     continue;
            // }
            const nextMoves = directions
                .map((d) => move(pos, d.dir))
                .filter((p) => isInBounds(p, map[0].length, map.length))
                .map((p) => [p, map[p.y][p.x]] as [Point, number])
                // deno-lint-ignore no-unused-vars
                .filter(([p, v]) => v === val + 1);
            for (const [p, v] of nextMoves) {
                if (v === 9) {
                    // endPositions.add(`${p.x},${p.y}`);
                    sum++;
                } else {
                    queue.push([p, v]);
                }
            }
        }
        return sum;
    }

    solvePart1(input: string): string {
        const map = this.parse(input);
        const starts = findPositions(map, (p) => p === 0);
        const scores = starts.map((p) => this.trailheadScore(map, p)).reduce((a, b) => a + b, 0);
        return scores.toString();
    }

    solvePart2(input: string): string {
        const map = this.parse(input);
        const starts = findPositions(map, (p) => p === 0);
        const scores = starts.map((p) => this.trailheadScore2(map, p)).reduce((a, b) => a + b, 0);
        return scores.toString();
    }
}

if (import.meta.main) {
    const day = new Day10();
    day.run();
}
