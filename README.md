# Skattekalkulator

A CLI program written in TypeScript that gives you an overview of your Norwegian income tax, based on salary income and any deductions.

> The program itself uses Norwegian words as flags (i.e --inntekt) and for error messages

## Features

### Planned

By passing arguments when running the program from the CLI, such as `--inntekt <amount>`, you will get back an overview of the most important tax calculations: tax on ordinary income (*alminnelig inntekt*), bracket tax (*trinnskatt*) and national insurance contribution (*trygdeavgift*). The standard deduction (*minstefradrag*) and personal allowance (*personfradrag*) are calculated automatically and deducted to arrive at ordinary income. You will easily see your total tax and your effective tax rate.

> The calculations do not include pensions, business income or the Finnmark deduction, and apply to a single income year only.

### Current

At the moment, most of the work is in validating (parsing) input from the CLI. Unit tests have also been added with Vitest. Further down you'll find a few examples of the functionality implemented so far.

## Technology

- **Node.js** for the runtime
- **TypeScript** for the implementation
- **Vitest** for unit tests

## Usage

### Prerequisites

[Node.js](https://nodejs.org/en), [Git](https://git-scm.com/)

### Steps

1. Clone

```sh
git clone https://github.com/alexdalene/skattekalkulator.git
```

2. Install

```sh
npm install
```

3. Build

```sh
npm run build
```

4. Run

```sh
npm run start -- --inntekt <amount> [--renter <amount>] [--reisefradrag <amount>]
```

5. Test

```sh
npm run test
```

## Examples

### Case 1: Valid input

```sh
$ npm run start -- --inntekt 100000
{ inntekt: 100000 }
```

### Case 2: Unknown argument

```sh
$ npm run start -- --inntekt 100000 --renterrr 50000
Ukjent argument: --renterrr
                 ^^^^^^^^^^
```

### Case 3: Missing a required flag

```sh
$ npm run start -- --renter 50000
Mangler flagg: --inntekt
               ^^^^^^^^^
```

### Case 4: Invalid structure (missing value)

```sh
$ npm run start -- --inntekt
Bruk: --inntekt <beløp> [--renter <beløp>] [--reisefradrag <beløp>]
```