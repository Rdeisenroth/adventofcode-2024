import { isInBounds, lines, type Point } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { getUniqueLoopCoords } from "@/day06/worker.ts";

export interface WorkerData {
    chunk: Point[];
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
        const res = getUniqueLoopCoords(obstacles, start, { x: 0, y: -1 }, ilines[0].length, ilines.length);
        // count unique positions
        console.profileEnd("Day06Part1");
        return res.length.toString();
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

        const loopCords = getUniqueLoopCoords(obstacles, start, startDir, width, height).filter((p) => isInBounds(p, width, height));
        const threadCount = Math.min(navigator.hardwareConcurrency || 4, loopCords.length);
        const chunkSize: number = Math.ceil(loopCords.length / threadCount);
        const promises: Promise<Point[]>[] = [];
        let doneWorkers = 0;

        for (let i = 0; i < threadCount; i++) {
            const startI: number = i * chunkSize;
            const endI: number = Math.min(startI + chunkSize, loopCords.length);
            const workerData: WorkerData = {
                chunk: loopCords.slice(startI, endI),
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
                        console.log(`Worker ${i} done (${(doneWorkers / threadCount * 100).toFixed(2)}% - ${doneWorkers * chunkSize}/${loopCords.length})`);
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
