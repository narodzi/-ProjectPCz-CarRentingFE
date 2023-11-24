export type User = Partial<{
    readonly _id: string | null,
    readonly licence_number: string | null,
    readonly wallet_balance: number | null,
    readonly country: string | null,
    readonly city: string | null,
    readonly postal_code: string | null,
    readonly house_number: string | null,
    readonly apartment_number: string | null,
    readonly phone_number: string | null
}>