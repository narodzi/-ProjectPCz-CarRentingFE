import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../models/car.model";

@Injectable({
    providedIn: 'root'
})
export class CarApi {
    constructor(private readonly http: HttpClient) {}

    getCars() {
        return this.http.get<Car[]>('http://localhost:4300/cars')
    }

    getCar(carId: string) {
        return this.http.get<Car>(`http://localhost:4300/cars/${carId}`)
    }

}