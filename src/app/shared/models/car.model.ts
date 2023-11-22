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

export type Car = Partial<{
    readonly _id: string | null
    readonly brand: string | null
    readonly model: string | null
    readonly number_of_seats: number | null
    readonly horse_power: number | null
    readonly gearbox: string | null
    readonly trunk: number | null
    readonly fuelType: string | null
    readonly number_of_doors: number | null
    readonly color: string | null
    readonly production_year: number | null
    readonly fuel_consumption: number | null
    readonly price: number | null
    readonly available: boolean | null
    readonly image_url: string | null
    readonly type: string | null
}>