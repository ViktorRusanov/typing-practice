import { ValidEmail } from '../entities/email';
import { ValidPassword } from '../entities/password';
import { User } from '../entities/user';
import UserService from './user-service';


export default class LoginService {
    constructor(private readonly userService: UserService) {
    }

    public async login(email: string, password: string): Promise<User> {
        const loggedUser = await this.userService.getUserByCreds(ValidEmail.from(email), ValidPassword.from(password));

        if (!loggedUser) {
            throw new Error('User not found');
        }

        return loggedUser;
    }
}
