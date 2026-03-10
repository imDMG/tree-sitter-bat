# tree-sitter-bat

Tree-sitter grammar for Windows Batch files (`.bat` and `.cmd`).

## Features

- Support for common batch commands: `ECHO`, `SET`, `IF`, `FOR`, `GOTO`, `CALL`, `EXIT`, `PAUSE`, `CLS`, `CD`, `COPY`, `DEL`, `DIR`, `MKDIR`, `RMDIR`, `RENAME`, `TYPE`, `FIND`
- Variable recognition: environment variables (`%PATH%`), special variables (`%DATE%`, `%USERNAME%`), parameters (`%1`, `%2`)
- Control structures: `IF/ELSE`, `FOR` loops
- Labels and subroutines
- Redirect operators and pipes
- Comments (`REM`)

## Installation

```bash
npm install
npm run generate
```

## Usage

### Parse a batch file

```bash
npx tree-sitter parse example.bat
```

### Run tests

```bash
npx tree-sitter test
```

## Development

### Generate parser

```bash
npx tree-sitter generate
```

### Test parsing

```bash
npx tree-sitter parse test.txt
```

## License

MIT

## Repository

https://github.com/imDMG/tree-sitter-bat
