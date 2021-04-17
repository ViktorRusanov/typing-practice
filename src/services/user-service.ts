import { ROLES_TO_OPERATIONS } from '../entities/roles-to-operations';
import type { RolesToOperations } from '../entities/roles-to-operations';
import { Admin } from '../entities/admin';
import { Client } from '../entities/client';
import { ValidEmail } from '../entities/email';
import { Moderator } from '../entities/moderator';
import { ValidPassword } from '../entities/password';
import { Role } from '../entities/role';
import type { RoleToUser } from '../entities/role-to-user';
import type { User } from '../entities/user';

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  async getUserByCreds(email: ValidEmail, password: ValidPassword) {
      await this.getAllUsers();

      return this.users.find(user => user.email === email.value && user.password === password.value);
  }

  getAvailableOperations<U1 extends User, U2 extends User>(user: U1, currenUser: U2): RolesToOperations[U2['role']][U1['role']] {
    return ROLES_TO_OPERATIONS[currenUser.role][user.role];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
