import * as fs from "@std/fs";
import * as path from "@std/path";
import { parseArgs } from "@std/cli/parse-args";

const days_dir = "./src/";
const test_dir = "./test/";
const data_dir = "./data/";
const data_test_dir = "./data_test/";

const flags = parseArgs(Deno.args, {
    boolean: ["help", "dry"],
    alias: { help: "h", test: "d" },
});

if (flags.help) {
    const firstline = "Advent of Code 2024 day creator";
    console.log("=".repeat(firstline.length));
    console.log(firstline);
    console.log("=".repeat(firstline.length));
    console.log("Usage: deno task create-day [options] <day number>");
    console.log("Options:");
    console.log("  -h, --help  Show this help message and exit.");
    console.log("  -d, --dry  Dry run. Do not create files, just show what would be done.");
    Deno.exit(0);
}

const dayNumberArg = flags._[0];
if (!dayNumberArg || isNaN(+dayNumberArg)) {
    console.error("Please provide the day number as the first argument.");
    Deno.exit(1);
}

function dryEnsureDir(dir: string) {
    console.log(`Ensuring directory ${dir}`);
    if (!flags.dry) {
        fs.ensureDirSync(dir);
    }
}

function dryWriteFile(file: string, content: string) {
    if (!flags.dry) {
        Deno.writeTextFileSync(file, content, { createNew: true });
        console.log(`Wrote file ${file}`);
    } else {
        console.log(`Writing file ${file}, content: ${content}`);
    }
}

function dryCopyFile(src: string, dest: string) {
    console.log(`Copying file ${src} to ${dest}`);
    if (!flags.dry) {
        Deno.copyFileSync(src, dest);
    }
}

const dayNumber = `${+dayNumberArg}`.padStart(2, "0");
const current_day_dir = path.join(days_dir, `day${dayNumber}`);
const current_test_dir = path.join(test_dir, `day${dayNumber}`);

dryEnsureDir(data_dir);
dryEnsureDir(data_test_dir);
for (const dir of [current_day_dir, current_test_dir]) {
    if (fs.existsSync(dir)) {
        console.error(`Day ${dayNumber} directory already exists: ${dir}\n Aborting.`);
        Deno.exit(1);
    }
    dryEnsureDir(dir);
}

// copy src/dayXX/DayXX.ts
const dayXX_src = path.join(days_dir, "dayXX/DayXX.ts");
const dayXX_dest = path.join(current_day_dir, `Day${dayNumber}.ts`);
let dayXX_content = Deno.readTextFileSync(dayXX_src);
dayXX_content = dayXX_content.replaceAll("XX", dayNumber);
dayXX_content = dayXX_content.replaceAll("-1", `${+dayNumber}`);
dryWriteFile(dayXX_dest, dayXX_content);
// copy test/dayXX/DayXX_test.ts
const dayXX_test_src = path.join(test_dir, "dayXX/DayXX_test.ts");
const dayXX_test_dest = path.join(current_test_dir, `Day${dayNumber}_test.ts`);
let dayXX_test_content = Deno.readTextFileSync(dayXX_test_src);
dayXX_test_content = dayXX_test_content.replaceAll("XX", dayNumber);
dryWriteFile(dayXX_test_dest, dayXX_test_content);
// ensure data/dayXX.txt
const dataXX_path = path.join(data_dir, `day${dayNumber}.txt`);
fs.ensureFileSync(dataXX_path);
// ensure data_test/dayXX.txt
const data_test_XX_path = path.join(data_test_dir, `day${dayNumber}.txt`);
fs.ensureFileSync(data_test_XX_path);
