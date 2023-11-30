import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsApi {
    constructor(private readonly http: HttpClient) {}

    getIncome() {
        return this.http.get<Partial<{income: string | null}>>('http://localhost:4300/statistics/')
    }
}