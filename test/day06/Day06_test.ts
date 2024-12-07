// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day06 } from "@/day06/Day06.ts";

const dayImpl = new Day06();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "5404");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "6");
});
