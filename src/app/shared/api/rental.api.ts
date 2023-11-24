import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rental } from "../models/rental.model";
import { KeycloakService } from "../auth/keycloak.service";

@Injectable({
    providedIn: 'root'
})
export class RentalApi {
    constructor(private readonly http: HttpClient, private readonly keycloakService: KeycloakService) {}

    getAllRentals() {
        return this.http.get<Rental[]>('http://localhost:4300/rentals')
    }

    getRental(rentalId: string) {
        return this.http.get<Rental>(`http://localhost:4300/rentals/${rentalId}`)
    }

    getRentalsForUser() {
        const userId = this.keycloakService.getUserId()
        return this.http.get<Rental[]>(`http://localhost:4300/rentals/user/${userId}`)
    }

}