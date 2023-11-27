import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserApi } from "../api/user.api";


@Injectable()
export class UserActivatedService {
    isUserActivatedSubject = new BehaviorSubject<boolean>(false)

    constructor(private readonly userApi: UserApi) {
        this.userApi.checkIfMongoExist().subscribe({
            next: () => this.isUserActivatedSubject.next(true),
            error: () => this.isUserActivatedSubject.next(false)
        })
    }

    get isUserActivated() {
        return this.isUserActivatedSubject.getValue()
    }
}