import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StatisticsApi {
    constructor(private readonly http: HttpClient) {}

    getOverallProfit() {
        return this.http.get<number>('http://localhost:4300/profit/')
    }
    
    getMonthlyProfit() {
        return this.http.get<number[]>('http://localhost:4300/profit/monthly')
    }
}