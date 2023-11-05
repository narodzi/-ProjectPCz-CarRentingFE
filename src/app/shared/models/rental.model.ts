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

export type RentalSearchDto = Partial<{
    startDate: string
    endDate: string
    carBrand: string | null
    carModel: string | null
    carEarliestProductionYear: number | null
    carGearboxType: string | null
    carFuelType: string | null
    carMinimalHorsePower: number | null
    carSeatNumber: number | null
    carDoorsNumber: number | null
    carColor: string | null
    minimalPrice: number
    maximalPrice: number
}>