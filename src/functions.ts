// Point to a specific word in a string
export function pointError(msg: string, word: string): never {
    const IDX = msg.lastIndexOf(word);

    let point = "^".repeat(word.length);
        
    let paddedText = point.padStart(IDX + word.length, " ");

    throw new Error((msg + "\n") + paddedText);
}