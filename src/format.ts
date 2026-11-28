import type { Calculated } from "./types.js";
import { pointError } from "./functions.js";

export default function formatNumbers(data: Calculated[]) {
    let output = data;

    let format = (value: Calculated) => Intl.NumberFormat("nb-NO", { style: value.type, currency: "NOK", minimumFractionDigits: 2 }).format(Number(value.amount));

    output.forEach((value) => {
        let num = format(value);
        let gap = "";
        value.amount = num;

        if (value?.action === "deduct") {
            gap = "".padEnd(50 - value.amount.length - value.name.length - 2);
            value.output = "- " + value.name + gap + value.amount;
        } else if (value?.action === "sum") {
            gap = "".padEnd(50 - value.amount.length - value.name.length - 2);
            value.output = "= " + value.name + gap + value.amount;
        } else {
            gap = "".padEnd(50 - value.amount.length - value.name.length);
            value.output = value.name + gap + value.amount;
        }
    });

    const GROUP_1 = output.filter((a) => a.group === 1);
    const GROUP_2 = output.filter((a) => a.group === 2);
    const GROUP_3 = output.filter((a) => a.group === 3);
    const GROUP_4 = output.filter((a) => a.group === 4);

    const GROUPS = [GROUP_1, GROUP_2, GROUP_3, GROUP_4];

    let table: string[] = [];

    GROUPS.forEach((group, i) => {
        group.sort((a, b) => a.order - b.order);
        group.forEach((g) => {
            if (!g.output) pointError(`Gruppe ${g.name} mangler output felt`, g.name);
            table.push(g.output)
        });

        if (i === 2) {
            let divider = "-".repeat(50);
            table.push(divider);
        } else {
            table.push("");
        }
    });

    return table;
};