import { Injectable } from '@angular/core';

const userKey = 'userName';

@Injectable()
export class SessionService {
    public get userName(): string {
        return sessionStorage.getItem(userKey);
    }

    public set userName(value: string) {
        sessionStorage.setItem(userKey, value);
    }

    public destroy() {
        sessionStorage.removeItem(userKey);
    }
}