// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day11 } from "@/day11/Day11.ts";

const dayImpl = new Day11();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "55312");
    // assertThrows(() => {
    //     dayImpl.solvePart1(input);
    // }, "Method not implemented.");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "55312");
});
