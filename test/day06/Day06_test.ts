// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day06 } from "@/day06/Day06.ts";

const dayImpl = new Day06();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "41");
});

Deno.test("test part 2", async () => {
    const input = dayImpl.getInput(true, 2);
    const result = await dayImpl.solvePart2(input);
    assertEquals(result, "6");
});
