// deno-lint-ignore no-unused-vars
import { assertEquals, assertThrows } from "@std/assert";
import { Day09 } from "@/day09/Day09.ts";

const dayImpl = new Day09();

Deno.test("checksum", () => {
    assertEquals(dayImpl.checksum("0099811188827773336446555566..............".split("")), 1928);
    assertEquals(dayImpl.checksum("00992111777.44.333....5555.6666.....8888..".split("")), 2858);
});

Deno.test("blockLayout", () => {
    assertEquals(dayImpl.blockLayout("12345"), "0..111....22222".split(""));
    assertEquals(dayImpl.blockLayout("2333133121414131402"), "00...111...2...333.44.5555.6666.777.888899".split(""));
});

Deno.test("defrag", () => {
    assertEquals(dayImpl.defrag("0..111....22222".split("")), "022111222......".split(""));
    assertEquals(
        dayImpl.defrag("00...111...2...333.44.5555.6666.777.888899".split("")),
        "0099811188827773336446555566..............".split(""),
    );
});

Deno.test("defrag2", () => {
    assertEquals(
        dayImpl.defrag2("00...111...2...333.44.5555.6666.777.888899".split("")),
        "00992111777.44.333....5555.6666.....8888..".split(""),
    );
});

Deno.test("test part 1", () => {
    const input = dayImpl.getInput(true, 1);
    const result = dayImpl.solvePart1(input);
    assertEquals(result, "1928");
});

Deno.test("test part 2", () => {
    const input = dayImpl.getInput(true, 2);
    const result = dayImpl.solvePart2(input);
    assertEquals(result, "2858");
});
