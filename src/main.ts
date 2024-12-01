import { parseArgs } from "@std/cli/parse-args";
import type { AdventOfCodeDay } from "@utils/AdventOfCodeDay.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const flags = parseArgs(Deno.args, {
        boolean: ["help", "test"],
        alias: { help: "h", test: "t" },
    });
    if (flags.help) {
        const firstline = "Advent of Code 2024 runner";
        console.log("=".repeat(firstline.length));
        console.log(firstline);
        console.log("=".repeat(firstline.length));
        console.log("Usage: deno task day [options] <day number>");
        console.log("Options:");
        console.log("  -h, --help  Show this help message and exit.");
        console.log("  -t, --test  Use the test input for the day. Default is the real input.");
        Deno.exit(0);
    }
    const dayNumberArg = flags._[0];
    if (!dayNumberArg || isNaN(+dayNumberArg)) {
        console.error("Please provide the day number as the first argument.");
        Deno.exit(1);
    }
    const dayNumber = `${+dayNumberArg}`.padStart(2, "0");
    console.log(`Running day ${dayNumber}...`);
    let day: AdventOfCodeDay | undefined;
    try {
        const dayModule = await import(`./day${dayNumber}/Day${dayNumber}.ts`);
        day = new dayModule[`Day${dayNumber}`]();
    } catch (error) {
        console.error(`Error loading day ${dayNumber}: ${error}`);
        Deno.exit(1);
    }
    if (flags.test) {
        day!.runTest();
    } else {
        day!.run();
    }
}
