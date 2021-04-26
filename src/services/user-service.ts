import { ValidEmail } from '../entities/email';
import { ValidPassword } from '../entities/password';
import { ROLES_TO_OPERATIONS, RolesToOperations } from '../entities/roles-to-operations';
import { Role } from "../entities/role";
import { User } from "../entities/user";
import { castTo } from "../entities/role-to-user";
import type { RoleToUser } from "../entities/role-to-user";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  async getUserByCreds(email: ValidEmail, password: ValidPassword) {
      await this.getAllUsers();

      return this.users.find(user => user.email === email && user.password === password);
  }

  getAvailableOperations<U1 extends User, U2 extends User>(user: U1, currenUser: U2): RolesToOperations[U2['role']][U1['role']] {
    return ROLES_TO_OPERATIONS[currenUser.role][user.role];
  }
}
