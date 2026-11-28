import parseArgs from "./parser.js";
import calculateTax from "./calculations.js";
import formatNumbers from "./format.js";

try {
    const ALTERED_ARRAY = process.argv.toSpliced(0, 2);
    let { inntekt, fradrag } = parseArgs(ALTERED_ARRAY);
    const CALCULATED = calculateTax(inntekt, fradrag);
    const TABLE = formatNumbers(CALCULATED);
    
    TABLE.forEach((t) => console.log(t));

    process.exit(0);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(e);
    }
    
    process.exit(1);
};