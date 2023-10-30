export type RentalDto = Partial<{
    readonly id: string | null
    readonly carId: string | null
    readonly userId: string | null
    readonly startDate: string | null
    readonly endDate: string | null
    readonly priceOverall: number | null
    readonly status: string | null
    readonly penalty: number | null
}>