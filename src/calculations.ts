export default function calculateTax(inntekt: number, fradrag: number) {
    let personfradrag = 114540;
    let minstefradrag = Math.min(inntekt * 0.46, 95700);
    let alminneligInntekt = Math.max(0, inntekt - minstefradrag - fradrag);
    let skattegrunnlag = Math.max(0, alminneligInntekt - personfradrag);
    let skattAlminneligInntekt = skattegrunnlag * 0.22;
    let trygdeavgift = inntekt <= 99650 ? 0 : Math.min(inntekt * 0.076, (inntekt - 99650) * 0.25);

    let trinnskatt = 0;
    let sats = 0;

    const TRINNSKATT_TABELL = [
        {
            innslagspunkt: 226100,
            sats: 0.017
        },
        {
            innslagspunkt: 318300,
            sats: 0.040
        },
        {
            innslagspunkt: 725050,
            sats: 0.137
        },
        {
            innslagspunkt: 980100,
            sats: 0.168
        },
        {
            innslagspunkt: 1467200,
            sats: 0.178
        },
    ];

    for (let i = 0; i < TRINNSKATT_TABELL.length; i++) {
        if (inntekt > TRINNSKATT_TABELL[i].innslagspunkt) {
            sats = TRINNSKATT_TABELL[i].sats;
        };

        let ovreGrense = i < (TRINNSKATT_TABELL.length - 1) ? TRINNSKATT_TABELL[i + 1].innslagspunkt : Infinity;
        let delbelop = Math.max(0, Math.min(inntekt, ovreGrense) - TRINNSKATT_TABELL[i].innslagspunkt);
        trinnskatt += delbelop * TRINNSKATT_TABELL[i].sats;
    };

    let totalSkatt = skattAlminneligInntekt + trygdeavgift + trinnskatt;
    let effektivSkattesats = totalSkatt / inntekt;
    let marginalSkattesats = (22 + 7.6) + (sats * 100);

    return { totalSkatt, effektivSkattesats, marginalSkattesats };
};