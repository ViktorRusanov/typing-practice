import * as t from 'runtypes';
import { Client } from '../entities/client';
import { Admin } from '../entities/admin';
import { Moderator } from '../entities/moderator';
import { Page } from '../entities/page';
import { User } from '../entities/user';

export default class AccessToPageService {
    private readonly pageToRoles = {
        [Page.DASHBOARD]: t.Union(Admin, Moderator),
        [Page.ACCOUNT]: t.Union(Admin, Moderator, Client)
    } as const;

    hasAccessTo(page: Page, user: User) {
        try {
            return !!this.pageToRoles[page].check(user);
        } catch {
            return false;
        }
    }
}
