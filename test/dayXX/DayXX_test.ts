// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { DayXX } from "@/dayXX/DayXX.ts";

const dayImpl = new DayXX();

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    // const result = dayImpl.solvePart1(input);
    // assertEquals(result, "1");
    assertThrows(() => {
        dayImpl.solvePart1(input);
    }, "Method not implemented.");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    // const result = dayImpl.solvePart2(input);
    // assertEquals(result, "2");
    assertThrows(() => {
        dayImpl.solvePart2(input);
    }, "Method not implemented.");
});
