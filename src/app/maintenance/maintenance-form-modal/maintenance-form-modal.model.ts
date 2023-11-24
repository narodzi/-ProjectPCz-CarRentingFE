import { Maintenance } from "src/app/shared/models/maintenance.model"

export type MaintenanceFormModalModel = {
    carID: string
    maintenance: Maintenance
    mode: string
}