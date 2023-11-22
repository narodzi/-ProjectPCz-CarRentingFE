import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RentalSearchRequest, RentalSearchResponse } from "../models/rental.model";

@Injectable({
    providedIn: 'root'
})
export class FilteredApi {
    constructor(private readonly http: HttpClient) {}

    getRentalSearchResults(searchRequest: RentalSearchRequest) {
        return this.http.post<RentalSearchResponse[]>('http://localhost:4300/filtered', searchRequest)
    }

}