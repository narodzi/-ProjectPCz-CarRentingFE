export type Car = Partial<{
    readonly _id: string | null
    readonly brand: string | null
    readonly model: string | null
    readonly number_of_seats: number | null
    readonly horse_power: number | null
    readonly gearbox: string | null
    readonly trunk: number | null
    readonly fuel_type: string | null
    readonly number_of_doors: number | null
    readonly color: string | null
    readonly production_year: number | null
    readonly fuel_consumption: number | null
    readonly price: number | null
    readonly available: boolean | null
    readonly image_url: string | null
    readonly type: string | null
}>

export type CarWithStatus = Partial<{
    readonly image_url: string | null
    readonly id: string | null
    readonly type: string | null
    readonly brand: string | null
    readonly model: string | null
    readonly fuel_type: string | null
    readonly gearbox: string | null
    readonly production_year: number | null
    readonly price: number | null
    readonly available: boolean | null
    readonly status: string | null
}>