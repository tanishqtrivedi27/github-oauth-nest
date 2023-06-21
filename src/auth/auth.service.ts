import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private users: Record<string, any> = {};


    async validateUser(id: string, username: string, displayName: string, accessToken: any) {
        console.log('Auth Service');
        const user = await this.findUserById(id);
        if (user) return user;

        console.log('User not found creating user');
        const newUser = {id, username, name: displayName, token: accessToken};

        this.createUser(newUser);
        return newUser;
    }

    createUser(user: any) {
        this.users[user.id] = user;
        return user;
    }

    findUserById(id: string): any {
        return this.users[id];
    }

}
