export type CarDto = Partial<{
    readonly id: string | null
    readonly brand: string | null
    readonly model: string | null
    readonly numberOfSeats: number | null
    readonly horsePower: number | null
    readonly gearbox: string | null
    readonly trunk: number | null
    readonly fuelType: string | null
    readonly numberOfDoors: number | null
    readonly color: string | null
    readonly productionYear: number | null
    readonly fuelConsumption: number | null
    readonly price: number | null
    readonly available: boolean | null
    readonly lastServiceDate: string | null
    readonly nextServiceDate: string | null
}>