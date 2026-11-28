export interface Calculated {
    name: string,
    amount: number | string,
    type: Intl.NumberFormatOptions["style"]
    group: 1 | 2 | 3 | 4
    order: number,
    action?: "deduct" | "sum"
    output?: string,
}