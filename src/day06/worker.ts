import { WorkerData } from "@/day06/Day06.ts";
import type { Point } from "@utils/util.ts";
// @deno-types="@types/lodash"
import _ from "lodash";

self.onmessage = (e: MessageEvent<WorkerData>) => {
    const { chunk, obstacles, start, startDir, width, height } = e.data;
    const validCoords: Point[] = [];

    for (const { x, y } of chunk) {
        if (x === 3 && y === 6) {
            console.log("here");
        }
        if (obstacles.find((o) => o.x === x && o.y === y) || (start.x === x && start.y === y)) {
            continue;
        }
        const newObstacles = [...obstacles, { x, y }];
        if (x === 3 && y === 6) {
            console.log("here2", newObstacles, start, startDir, width, height);
        }
        if (isLoop(newObstacles, start, startDir, width, height)) {
            if (x === 3 && y === 6) {
                console.log("here3");
            }
            validCoords.push({ x, y });
        }
        if (x === 3 && y === 6) {
            console.log("here4");
        }
    }

    self.postMessage(validCoords);
};

export function nextMove(opstacles: Point[], pos: Point, dir: Point): [Point, Point] | null {
    const nextDir: Point = { x: dir.x, y: dir.y };
    const nextPos: Point = { x: pos.x + nextDir.x, y: pos.y + nextDir.y };
    // check if there is an obstacle
    let turns = 0;
    // while there is a wall, turn right
    while (opstacles.find((o) => o.x === nextPos.x && o.y === nextPos.y)) {
        if (turns === 4) {
            return null;
        }
        const oldX = nextDir.x;
        nextDir.x = -nextDir.y;
        nextDir.y = oldX;
        nextPos.x = pos.x + nextDir.x;
        nextPos.y = pos.y + nextDir.y;
        turns++;
    }
    // if there is no wall, move forward
    return [nextPos, nextDir];
}

export function isInBounds(point: Point, width: number, height: number): boolean {
    return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
}

export function isLoop(opstacles: Point[], pos: Point, dir: Point, width: number, height: number): boolean {
    const curDir = { x: dir.x, y: dir.y };
    const curPos: Point = { x: pos.x, y: pos.y };
    const visited: Set<string> = new Set();
    const maxSteps = 100_000;
    let steps = 0;
    while (isInBounds(curPos, width, height)) {
        if (steps > maxSteps) {
            throw new Error("Too large, possible logic error");
        }
        visited.add(`${curPos.x},${curPos.y},${curDir.x},${curDir.y}`);
        const nextPos = nextMove(opstacles, curPos, curDir);
        if (!nextPos || visited.has(`${nextPos[0].x},${nextPos[0].y},${nextPos[1].x},${nextPos[1].y}`)) {
            return true;
        }
        curPos.x = nextPos[0].x;
        curPos.y = nextPos[0].y;
        curDir.x = nextPos[1].x;
        curDir.y = nextPos[1].y;
        steps++;
    }
    return false;
}

export function getUniqueLoopCoords(obstacles: Point[], start: Point, startDir: Point, width: number, height: number): Point[] {
    const curDir = _.clone(startDir);
    const curPos: Point = _.clone(start);
    let steps = 0;
    const positions: Set<string> = new Set();
    // while in bounds
    while (isInBounds(curPos, width, height)) {
        // check if there is a wall in front
        const nextPos = nextMove(obstacles, curPos, curDir);
        if (nextPos) {
            curPos.x = nextPos[0].x;
            curPos.y = nextPos[0].y;
            curDir.x = nextPos[1].x;
            curDir.y = nextPos[1].y;
            steps++;
            positions.add(`${curPos.x},${curPos.y}`);
        } else {
            throw new Error("Stuck");
        }
    }
    // remove start position
    positions.delete(`${start.x},${start.y}`);
    // convert back to Point[]
    return Array.from(positions).map((p) => {
        const [x, y] = p.split(",").map((n) => parseInt(n));
        return { x, y };
    });
}
