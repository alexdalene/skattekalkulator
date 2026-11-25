import parseArgs from "./parser.js";

try {
    const alteredArr = process.argv.toSpliced(0, 2);
    const data = parseArgs(alteredArr);
    console.log(data);

    process.exit(0);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(e);
    }
    
    process.exit(1);
};