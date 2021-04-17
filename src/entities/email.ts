export class ValidEmail {
    static from(email: string) {
        if (email.includes('@')) {
            return new ValidEmail(email);
        }

        throw new Error('Invalid email');
    }

    private readonly _type = Symbol('ValidEmail');

    protected constructor(public readonly value: string) {
    }
}
