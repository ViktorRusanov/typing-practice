import * as t from 'runtypes';

export const ValidPassword = t.String
    .withConstraint(password => password.length > 3)
    .withBrand('ValidPassword');

export type ValidPassword = t.Static<typeof ValidPassword>
