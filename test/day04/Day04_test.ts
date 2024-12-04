// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day04 } from "@/day04/Day04.ts";

const dayImpl = new Day04();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "18");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "9");
});
