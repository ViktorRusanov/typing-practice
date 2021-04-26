import * as t from 'runtypes';

export const ValidEmail = t.String
    .withConstraint( email => email.includes('@'))
    .withBrand('ValidEmail');

export type ValidEmail = t.Static<typeof ValidEmail>;
