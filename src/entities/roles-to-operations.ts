import { Operation } from './operation';
import { Role } from './role';

export const ROLES_TO_OPERATIONS = {
    [Role.ADMIN]: {
        [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
        [Role.MODERATOR]: [Operation.UPDATE_TO_ADMIN, Operation.UPDATE_TO_CLIENT],
        [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    },
    [Role.MODERATOR]: {
        [Role.ADMIN]: [],
        [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
        [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    },
    [Role.CLIENT]: {
        [Role.ADMIN]: [],
        [Role.MODERATOR]: [],
        [Role.CLIENT]: [],
    },
};

export type RolesToOperations = typeof ROLES_TO_OPERATIONS;
