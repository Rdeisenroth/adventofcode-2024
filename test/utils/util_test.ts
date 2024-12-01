import { assertEquals } from "@std/assert";
import { lines } from "@utils/util.ts";
Deno.test("test lines", () => {
    assertEquals(lines("a\nb\nc"), ["a", "b", "c"]);
    assertEquals(lines("a\r\nb\nc"), ["a", "b", "c"]);
    assertEquals(lines("a\r\n\r\nb\r\nc"), ["a", "", "b", "c"]);
    assertEquals(lines(""), []);
});
