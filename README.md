# Skattekalkulator

CLI-program skrevet i TypeScript som gir deg en oversikt over skatten din, basert på lønnsinntekt og eventuelle fradrag.

## Funksjonalitet

### Planlagt

Ved å gi argumenter når du kjører programmet gjennom CLI, som `--inntekt <beløp>`, vil du få tilbake en oversikt over mange viktige skatteutregninger; skatt på alminnelig inntekt, trinnskatt og trygdeavgift. Minstefradrag og personfradrag blir utregnet automatisk og utgjør alminnelig inntekt. Du vil lett se din totale skatt, og effektiv skattesats.

> Utregningene tar ikke med pensjon, næringsinntekt eller Finnmarksfradrag, og gjelder bare for ett inntektsår.

### Foreløpig

Akkurat nå går det meste i å validere (parse) input fra CLI. Lenger ned ser du et par eksempler på funksjonalitet foreløpig implementert.

## Teknologi

- **Node.js** for runtime
- **TypeScript** for funksjonalitet

## Bruk

### Påkrevd

[Node.js](https://nodejs.org/en), [Git](https://git-scm.com/)

1. Kopier

```sh
git clone https://github.com/alexdalene/skattekalkulator.git
```

2. Installer

```sh
npm install
```

3. Bygg

```sh
npm run build
```

4. Kjør

```sh
npm run start -- --inntekt <beløp> [--renter <beløp>] [--reisefradrag <beløp>]
```

## Eksempler

### Case 1: Alt er skrevet riktig

```sh
$ npm run start -- --inntekt 100000
{ inntekt: 100000 }
```

### Case 2: Ukjent argument

```sh
$ npm run start -- --inntekt 100000 --renterrr 50000
Ukjent argument funnet: --renterrr
```

### Case 3: Mangler et påkrevd flagg

```sh
$ npm run start -- --renter 50000
Følgende flagg mangler: --inntekt
```

### Case 4: Feil struktur (verdi)

```sh
$ npm run start -- --inntekt
Hvert argument må være etterfulgt av en verdi: --inntekt <beløp>
```
