import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { KeycloakService } from "../keycloak/services/keycloak.service";
import { of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserApi {
    constructor(private readonly http: HttpClient, private readonly keycloakService: KeycloakService) {}
    // Admin role v

    getUsers() {
        return this.http.get<User[]>('http://localhost:4300/users')
    }

    getUser(userId: string) {
        return this.http.get<User>(`http://localhost:4300/users/${userId}`)
    }

    deleteUser(userId: string) {
        return this.http.delete<number>(`http://localhost:4300/users/${userId}`)
    }

    addUser(user: User) {
        return this.http.post<number>(`http://localhost:4300/users`, user)
    }

    updateUser(user: User, userId: string) {
        return this.http.put<number>(`http://localhost:4300/users/${userId}`, user)
    }

    subtractUserMoney(userId: string, amount: number) {
        return this.http.put<number>(`http://localhost:4300/users/${userId}/subtractMoney?amount=${amount}`, {})
    }

    // User role v

    getUserinfoAsUser() {
        const userId = this.keycloakService.getUserId()
        return this.http.get<User>(`http://localhost:4300/users/${userId}`)
    }

    addMoneyToWallerasUser(amount: number) {
        const userId = this.keycloakService.getUserId()
        return this.http.put<User>(`http://localhost:4300/users/${userId}/addMoney?amount=${amount}`, {})
    }

    
    // Auth - check if user account is activated = all data is filled

    checkIfMongoExist() {
        const userId = this.keycloakService.getUserId()
        console.log(userId)
        return this.http.get(`http://localhost:4300/users/mongo_exist/${userId}`, {observe: 'response'}).pipe(switchMap(resp => {
            console.log(resp)
            if(resp.status === 200) {
                return of(true)
            }
            if(resp.status === 204) {
                return of(false)
            }
            return of(false)
        }))
    }
}