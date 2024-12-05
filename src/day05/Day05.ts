// @deno-types="@types/lodash"
import _ from "lodash";
// deno-lint-ignore no-unused-vars
import * as mathjs from "mathjs";

import { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";
import { lines } from "@utils/util.ts";

/**
 * The solution for Day 05.
 */
export class Day05 extends AdventOfCodeDay {
    constructor() {
        super(5);
    }

    validatePages(pages: number[], rules: [number, number][]): boolean {
        for (const [p1, p2] of rules) {
            const p1i = pages.indexOf(p2);
            const p2i = pages.indexOf(p1);
            if (p1i < 0 || p2i < 0) {
                continue;
            }
            // ensure rp1 is before rp2
            if (p2i > p1i) {
                return false;
            }
        }
        return true;
    }

    sortPages(pages: number[], rules: [number, number][]): number[] {
        return pages.toSorted((a, b) => {
            const rule = rules.find((r) => (r[0] === a && r[1] === b) || (r[0] === b && r[1] === a));
            return rule ? a === rule[0] ? -1 : 1 : 0;
        });
    }

    solvePart1(input: string): string {
        const rules = lines(input).filter((l) => l.includes("|")).map((l) => l.split("|").map((p) => +p) as [number, number]);
        const pages = lines(input).filter((l) => l.includes(",")).map((l) => l.split(",").map((n) => +n));
        let sum = 0;
        for (let i = 0; i < pages.length; i++) {
            const ps = pages[i];
            if (this.validatePages(ps, rules)) {
                sum += ps[Math.floor(ps.length / 2)];
            }
        }
        return sum.toString();
    }

    solvePart2(input: string): string {
        const rules = lines(input).filter((l) => l.includes("|")).map((l) => l.split("|").map((p) => +p) as [number, number]);
        const pages = lines(input).filter((l) => l.includes(",")).map((l) => l.split(",").map((n) => +n));
        let sum = 0;
        for (let i = 0; i < pages.length; i++) {
            const ps = pages[i];
            if (!this.validatePages(ps, rules)) {
                // sort
                const sortedPs = this.sortPages(ps, rules);
                // find middle element
                sum += sortedPs[Math.floor(sortedPs.length / 2)];
            }
        }
        return sum.toString();
    }
}

if (import.meta.main) {
    const day = new Day05();
    day.run();
}
