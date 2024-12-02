// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day02 } from "@/day02/Day02.ts";

const dayImpl = new Day02();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "2");
    // assertThrows(() => {
    //     dayImpl.solvePart1(input);
    // }, "Method not implemented.");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "4");
    // assertThrows(() => {
    //     dayImpl.solvePart2(input);
    // }, "Method not implemented.");
});
