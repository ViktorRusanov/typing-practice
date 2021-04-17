export class ValidPassword {
    static from(password: string) {
        if (password.length > 3) {
            return new ValidPassword(password);
        }

        throw new Error('Password length should be more than 3 symbols');
    }

    private readonly _type = Symbol('ValidPassword');

    protected constructor(public readonly value: string) {
    }
}
