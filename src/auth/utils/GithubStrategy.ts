import { Inject } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";
import { AuthService } from "../auth.service";

export class GithubStrategy extends PassportStrategy(Strategy) {

    constructor (@Inject(AuthService) private readonly authService: AuthService) {
        super({
            clientID: '',
            clientSecret: '',
            callbackURL: 'http://localhost:3000/auth/github/callback',
            scope: ['repo']
          });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){
        
        const { id, username, displayName } = profile;
        console.log({ id, username, displayName, accessToken });

        const user = await this.authService.validateUser(id, username, displayName, accessToken);

        console.log('Validate');
        console.log(user);
        return user || null;
        
    }
}
