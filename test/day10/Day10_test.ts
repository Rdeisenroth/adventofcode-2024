// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day10 } from "@/day10/Day10.ts";

const dayImpl = new Day10();

Deno.test("test trailhead score", () => {
    const input = dayImpl.parse(`0123
1234
8765
9876`);
    assertEquals(
        dayImpl.trailheadScore(input, { x: 0, y: 0 }),
        1,
    );
    const input2 = dayImpl.parse(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`);
    assertEquals(
        dayImpl.trailheadScore(input2, { x: 3, y: 0 }),
        2,
    );
});
Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "36");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "81");
});
