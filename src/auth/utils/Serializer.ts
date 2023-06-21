import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(user: any, done: Function) {
        console.log('Serializer User');
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {

        const user = await this.authService.findUserById(payload.id);
        console.log('Deserialize User');
        console.log(user);
        return user ? done(null, user) : done(null, null);
        
    }
}