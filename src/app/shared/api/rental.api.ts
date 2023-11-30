import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rental, RentalRequest } from "../models/rental.model";
import { KeycloakService } from "../keycloak/services/keycloak.service";

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

    cancelRental(rentalId: string) {
        return this.http.post<string>(`http://localhost:4300/rentals/cancel/${rentalId}`, {})
    }

    addRental(rental: RentalRequest) {
        const userId = this.keycloakService.getUserId()
        const rentalWithUserId = {...rental, user_id: userId}
        return this.http.post<string>(`http://localhost:4300/rentals/`, rentalWithUserId)
    }

}