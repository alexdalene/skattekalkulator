const CLI_ARGUMENTS = process.argv;
const N = CLI_ARGUMENTS.length;

interface AllowedFlag {
    name: string;
    required: boolean;
};

// Store the flags in a data structure for better control
const ALLOWED_FLAGS: AllowedFlag[] = [{
    name: "--inntekt",
    required: true,
},
{
    name: "--renter",
    required: false,
},
{
    name: "--reisefradrag",
    required: false,
},
];

const REQUIRED_FLAGS = ALLOWED_FLAGS.filter((flag) => flag.required);

// Make the error message dynamic
let errorMsg: string;
let result: string[] = [];

ALLOWED_FLAGS.forEach((f) => {
    if (REQUIRED_FLAGS.includes(f)) {
        result.push("Bruk: " + f.name);
        result.push(" <beløp> ")
    } else {
        result.push("[" + f.name);
        result.push(" <beløp>] ")
    }
});

errorMsg = result.join("");

// Exit process if there's less than 3 cli arguments
if (!(N >= 3)) {
    console.error(errorMsg);
    process.exit(1);
};

// Could use filter to find ALL flags that are missing, but opted not to
const MISSING_FLAG = REQUIRED_FLAGS.find((flag) => !CLI_ARGUMENTS.includes(flag.name));

if (MISSING_FLAG) {
    console.error(`Følgende flagg mangler: ${MISSING_FLAG.name}`);
    process.exit(1);
};

let obj: Record<string, number> = {};

for (let i = 2; i < N; i++) {
    // If it starts with "--" i.e "--inntekt" AND that the value of next index is true i.e "--inntekt 100000"
    if (CLI_ARGUMENTS[i].startsWith("--") && CLI_ARGUMENTS[i + 1]) {
        // If a flag in ALLOWED_FLAGS is equal to the i of CLI_ARGUMENTS
        if (ALLOWED_FLAGS.find((flag) => flag.name == CLI_ARGUMENTS[i])) {
            let argFlag = CLI_ARGUMENTS[i].slice(2);
            let argValue = Number(CLI_ARGUMENTS[i + 1]);
    
            if (!Number.isNaN(argValue) && argValue > 0) {
                obj[argFlag] = argValue;
            } else {
                console.error("Hvert argument må være etterfulgt av en positiv verdi: --inntekt <beløp>");
                process.exit(1);
            }
        } else {
            console.error(`Ukjent argument funnet: ${CLI_ARGUMENTS[i]}`);
            process.exit(1);
        }
    } else {
        console.error("Hvert argument må være etterfulgt av en verdi: --inntekt <beløp>");
        process.exit(1);
    }

    i++;
};

console.log(obj);