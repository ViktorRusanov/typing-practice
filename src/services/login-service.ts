import { ValidEmail } from '../entities/email';
import { ValidPassword } from '../entities/password';
import { User } from '../entities/user';
import UserService from './user-service';


export default class LoginService {
    constructor(private readonly userService: UserService) {
    }

    public async login(email: ValidEmail, password: ValidPassword): Promise<User> {
        const loggedUser = await this.userService.getUserByCreds(email, password);

        if (!loggedUser) {
            throw new Error('User not found');
        }

        return loggedUser;
    }
}
