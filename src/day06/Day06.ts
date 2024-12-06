import { Direction, lines, type Point } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

/**
 * The solution for Day 06.
 */
export class Day06 extends AdventOfCodeDay {
    constructor() {
        super(6);
    }

    // deno-lint-ignore no-unused-vars
    solvePart1(input: string): string {
        const ilines = lines(input);
        ilines.map(l => l.split(""));
        const obstacles:Point[] = [];
        const start:Point = {x: -1, y: -1};
        for(let y = 0; y < ilines.length; y++) {
            for(let x = 0; x < ilines[y].length; x++) {
                if(ilines[y][x] === "#") {
                    obstacles.push({x, y});
                } else if(ilines[y][x] === "^") {
                    start.x = x;
                    start.y = y;
                }
            }
        }
        const curDir= {x: 0, y: -1};
        const curPos: Point = start;
        let steps = 0;
        // while in bounds
        while (curPos.x >= 0 && curPos.x < ilines[0].length && curPos.y >= 0 && curPos.y < ilines.length) {
            // check if there is a wall in front
            const nextPos:Point = {x: curPos.x + curDir.x, y: curPos.y + curDir.y};
            if(obstacles.find(o => o.x === nextPos.x && o.y === nextPos.y)) {
                // if there is a wall, turn right
                const oldX = curDir.x;
                curDir.x = -curDir.y;
                curDir.y = oldX;
            } else {
                // if there is no wall, move forward
                curPos.x = nextPos.x;
                curPos.y = nextPos.y;
                steps++;
            }
        }
        return steps.toString();
    }

    // deno-lint-ignore no-unused-vars
    solvePart2(input: string): string {
        throw new Error("Method not implemented.");
    }
}

if (import.meta.main) {
    const day = new Day06();
    day.run();
}
