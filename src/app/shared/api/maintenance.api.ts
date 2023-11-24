import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "../auth/keycloak.service";
import { Maintenance } from "../models/maintenance.model";

@Injectable({
    providedIn: 'root'
})
export class MaintenanceApi {
    constructor(private readonly http: HttpClient, private readonly keycloakService: KeycloakService) {}

    getMaintenances() {
        return this.http.get<Maintenance[]>('http://localhost:4300/maintenances')
    }

    addMaintenance(maintenance: Maintenance) {
        return this.http.post<number>('http://localhost:4300/maintenances', maintenance)
    }

    updateMaintenance(maintenance: Maintenance, maintenanceId: string) {
        return this.http.put<number>(`http://localhost:4300/maintenances/${maintenanceId}`, maintenance)
    }

    deleteMaintenance(maintenanceId: string) {
        return this.http.delete<number>(`http://localhost:4300/maintenances/${maintenanceId}`)
    }

    getMaintanancesForCar(carId: string) {
        return this.http.get<Maintenance[]>(`http://localhost:4300/maintenances/car/${carId}`)
    }
} 