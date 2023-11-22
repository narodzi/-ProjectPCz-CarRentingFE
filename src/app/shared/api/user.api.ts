import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserApi {
    constructor(private readonly http: HttpClient) {}

    getUsers() {
        return this.http.get<User[]>('http://localhost:4300/users')
    }
}