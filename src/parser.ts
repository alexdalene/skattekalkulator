interface AllowedFlag {
    name: string;
    required: boolean;
};

// Store the flags in a data structure for better control
const ALLOWED_FLAGS: AllowedFlag[] = [
    {
        name: '--inntekt',
        required: true,
    },
    {
        name: '--renter',
        required: false,
    },
    {
        name: '--reisefradrag',
        required: false,
    },
];

const REQUIRED_FLAGS = ALLOWED_FLAGS.filter((flag) => flag.required);

export default function parseArgs(args: string[]) {
    const CLI_ARGUMENTS = args;
    const N = CLI_ARGUMENTS.length;

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

    // Point to a specific word in a string
    function pointError(msg: string, word: string): never {
        const IDX = msg.lastIndexOf(word);

        let point = "^".repeat(word.length);
        
        let paddedText = point.padStart(IDX + word.length, " ");

        throw new Error((msg + "\n") + paddedText);
    }

    // Could use filter to find ALL flags that are missing, but opted not to
    const MISSING_FLAG = REQUIRED_FLAGS.find((flag) => !CLI_ARGUMENTS.includes(flag.name));

    if (MISSING_FLAG) {
        pointError(`Mangler flagg: ${MISSING_FLAG.name}`, MISSING_FLAG.name);
    };

    let obj: Record<string, number> = {};

    for (let i = 0; i < N; i++) {
        // If it starts with "--" i.e "--inntekt" AND that the value of next index is true i.e "--inntekt 100000"
        if (CLI_ARGUMENTS[i].startsWith("--") && CLI_ARGUMENTS[i + 1]) {
            // If a flag in ALLOWED_FLAGS is equal to the i of CLI_ARGUMENTS
            if (ALLOWED_FLAGS.find((flag) => flag.name == CLI_ARGUMENTS[i])) {
                let argFlag = CLI_ARGUMENTS[i].slice(2);
                let argValue = Number(CLI_ARGUMENTS[i + 1]);
        
                if (!Number.isNaN(argValue) && argValue > 0) {
                    obj[argFlag] = argValue;
                } else {
                    pointError(`Kun tall og positive verdier: --${argFlag} ${CLI_ARGUMENTS[i + 1]}`, CLI_ARGUMENTS[i + 1]);
                }
            } else {
                pointError(`Ukjent argument: ${CLI_ARGUMENTS[i]}`, CLI_ARGUMENTS[i]);
            }
        } else {
            throw new Error(errorMsg);
        }

        i++;
    };

    return obj;
};