# My personal implementation of Advent of code 2024.
![Made with Deno](https://img.shields.io/badge/made_with-Deno-000000?logo=deno&logoColor=white)
 [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
```py
         |
        -+-
         A
        /=\               /\  /\    ___  _ __  _ __ __    __
      i/ O \i            /  \/  \  / _ \| '__|| '__|\ \  / /
      /=====\           / /\  /\ \|  __/| |   | |    \ \/ /
      /  i  \           \ \ \/ / / \___/|_|   |_|     \  /
    i/ O * O \i                                       / /
    /=========\        __  __                        /_/    _
    /  *   *  \        \ \/ /        /\  /\    __ _  ____  | |
  i/ O   i   O \i       \  /   __   /  \/  \  / _` |/ ___\ |_|
  /=============\       /  \  |__| / /\  /\ \| (_| |\___ \  _
  /  O   i   O  \      /_/\_\      \ \ \/ / / \__,_|\____/ |_|
i/ *   O   O   * \i
/=================\
       |___|

```

## Usage
You can start a day with the `deno task day <number>` command. Add the `--test` option to run the test input`. Otherwise, you can run the test cases or the individual day files directly in your IDE. For VS-Code, sensible defaults are provided.

### With real input:
```bash
# without watcher
deno task day 1
# with watching
deno task dev 1
```

### With test input:
```bash
# without watcher
deno task day 1 -t
# with watcher
deno task dev 1 -t
# this runs all tests. Use Deno extension in VSCode to run individual tests.
deno test
```

### Linting
```bash
npm run lint
```

### Generating new day
using `deno task create-day <day>` you can automatically generate a new day:
```bash
deno task create-day 2
```
> Hint: to preview this, you can add the -d (dry run) option

## Folder structure
### `src/`
This folder contains the source code for the solutions. Each day has its own folder, with a two digit number name. All Common code is in the `utils/` folder. Uses the files from the `data/` folder as input.
### `test/`
This folder contains the tests for the solutions. Each day has its own folder, with a two digit number name. Uses the files from the `data_test/` folder as input.
### `data/`
This folder contains the input data for the solutions. The format is `day<day>.txt`. If a day has more than one input, the format`day<day>_<part>.txt` is used for all parts except the first. Selecting the correct input is handled in the abstract `AdventOfCodeDay` class.
### `data_test/`
Same as `data/`, but for the test inputs.
