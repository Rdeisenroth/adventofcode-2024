import { WorkerData } from "@/day06/Day06.ts";
import type { Point } from "@utils/util.ts";

self.onmessage = (e: MessageEvent<WorkerData>) => {
    const { chunk, obstacles, start, startDir, width, height } = e.data;
    const validCoords: Point[] = [];

    for (let y = chunk.startY; y < chunk.endY; y++) {
        for (let x = chunk.startX; x < chunk.endX; x++) {
            if (obstacles.find((o) => o.x === x && o.y === y) || (start.x === x && start.y === y)) {
                continue;
            }
            const newObstacles = [...obstacles, { x, y }];
            if (isLoop(newObstacles, start, startDir, width, height)) {
                validCoords.push({ x, y });
            }
        }
    }

    self.postMessage(validCoords);
};

export function nextMove(opstacles: Point[], pos: Point, dir: Point): Point | null {
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
        if (!nextPos || visited.has(`${nextPos.x},${nextPos.y},${curDir.x},${curDir.y}`)) {
            return true;
        }
        curPos.x = nextPos.x;
        curPos.y = nextPos.y;
        steps++;
    }
    return false;
}
