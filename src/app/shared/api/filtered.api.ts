import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RentalSearchRequest, RentalSearchResponse } from "../models/rental.model";
import { FilteredParameters } from "../models/filtered.model";

@Injectable({
    providedIn: 'root'
})
export class FilteredApi {
    constructor(private readonly http: HttpClient) {}

    getRentalSearchResults(searchRequest: RentalSearchRequest) {
        return this.http.post<RentalSearchResponse[]>('http://localhost:4300/filtered', searchRequest)
    }

    getFilteredParameters() {
        return this.http.get<FilteredParameters>('http://localhost:4300/filtered/parameters')
    }
}