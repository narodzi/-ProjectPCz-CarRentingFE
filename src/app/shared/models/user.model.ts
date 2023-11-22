export type User = Partial<{
    readonly _id: string,
    readonly licence_number: string,
    readonly wallet_balance: number,
    readonly country: string,
    readonly city: string,
    readonly postal_code: string,
    readonly house_number: string,
    readonly apartment_number: string,
    readonly phone_number: string
}>