import { lines, type Point } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

export interface Chunk {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
}

export interface WorkerData {
    chunk: Chunk;
    obstacles: Point[];
    start: Point;
    startDir: Point;
    width: number;
    height: number;
}

/**
 * The solution for Day 06.
 */
export class Day06 extends AdventOfCodeDay {
    constructor() {
        super(6);
    }

    nextMove(opstacles: Point[], pos: Point, dir: Point): Point | null {
        let nextPos: Point = { x: pos.x + dir.x, y: pos.y + dir.y };
        // check if there is an obstacle
        let turns = 0;
        // while there is a wall, turn right
        while (opstacles.find((o) => o.x === nextPos.x && o.y === nextPos.y)) {
            if (turns === 4) {
                return null;
            }
            const oldX = dir.x;
            dir.x = -dir.y;
            dir.y = oldX;
            nextPos = { x: pos.x + dir.x, y: pos.y + dir.y };
            turns++;
        }
        // if there is no wall, move forward
        return nextPos;
    }

    isInBounds(point: Point, width: number, height: number): boolean {
        return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
    }

    isLoop(opstacles: Point[], pos: Point, dir: Point, width: number, height: number): boolean {
        const curDir = { x: dir.x, y: dir.y };
        const curPos: Point = { x: pos.x, y: pos.y };
        const visited: Set<string> = new Set();
        const maxSteps = 100_000;
        let steps = 0;
        while (this.isInBounds(curPos, width, height)) {
            if (steps > maxSteps) {
                throw new Error("Too large, possible logic error");
            }
            visited.add(`${curPos.x},${curPos.y},${curDir.x},${curDir.y}`);
            const nextPos = this.nextMove(opstacles, curPos, curDir);
            if (!nextPos || visited.has(`${nextPos.x},${nextPos.y},${curDir.x},${curDir.y}`)) {
                return true;
            }
            curPos.x = nextPos.x;
            curPos.y = nextPos.y;
            steps++;
        }
        return false;
    }

    solvePart1(input: string): string {
        console.profile("Day06Part1");
        const ilines = lines(input);
        const obstacles: Point[] = [];
        const start: Point = { x: -1, y: -1 };
        for (let y = 0; y < ilines.length; y++) {
            for (let x = 0; x < ilines[y].length; x++) {
                if (ilines[y][x] === "#") {
                    obstacles.push({ x, y });
                } else if (ilines[y][x] === "^") {
                    start.x = x;
                    start.y = y;
                }
            }
        }
        const curDir = { x: 0, y: -1 };
        const curPos: Point = start;
        let steps = 0;
        const positions: Set<string> = new Set();
        // while in bounds
        while (this.isInBounds(curPos, ilines[0].length, ilines.length)) {
            // check if there is a wall in front
            const nextPos = this.nextMove(obstacles, curPos, curDir);
            if (nextPos) {
                curPos.x = nextPos.x;
                curPos.y = nextPos.y;
                steps++;
                positions.add(`${curPos.x},${curPos.y}`);
            } else {
                throw new Error("Stuck");
            }
        }
        // count unique positions
        console.profileEnd("Day06Part1");
        return positions.size.toString();
    }

    async solvePart2(input: string): Promise<string> {
        console.profile("Day06Part2");
        const ilines: string[] = lines(input);
        const obstacles: Point[] = [];
        const start: Point = { x: -1, y: -1 };
        const startDir: Point = { x: 0, y: -1 };

        for (let y = 0; y < ilines.length; y++) {
            for (let x = 0; x < ilines[y].length; x++) {
                if (ilines[y][x] === "#") {
                    obstacles.push({ x, y });
                } else if (ilines[y][x] === "^") {
                    start.x = x;
                    start.y = y;
                }
            }
        }

        const width: number = ilines[0].length;
        const height: number = ilines.length;
        const threadCount = navigator.hardwareConcurrency || 4;
        const chunkSize: number = Math.ceil(height / threadCount);
        const promises: Promise<Point[]>[] = [];
        let doneWorkers = 0;

        for (let i = 0; i < threadCount; i++) {
            const startY: number = i * chunkSize;
            const endY: number = Math.min(startY + chunkSize, height);
            const workerData: WorkerData = {
                chunk: { startX: 0, endX: width, startY, endY },
                obstacles,
                start,
                startDir,
                width,
                height,
            };

            promises.push(
                new Promise((resolve, reject) => {
                    const worker = new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
                    worker.postMessage(workerData);
                    worker.onmessage = (e: MessageEvent<Point[]>) => {
                        doneWorkers++;
                        console.log(`Worker ${i} done (${(doneWorkers / threadCount * 100).toFixed(2)}%)`);
                        worker.terminate();
                        resolve(e.data);
                    };
                    worker.onerror = reject;
                    worker.onmessageerror = reject;
                }),
            );
        }

        try {
            const results = await Promise.all(promises);
            const validCoords: Point[] = results.flat();
            console.profileEnd("Day06Part2");
            return validCoords.length.toString();
        } catch (err) {
            console.error(err);
            return "0";
        }
    }
}

if (import.meta.main) {
    const day = new Day06();
    day.run();
}
