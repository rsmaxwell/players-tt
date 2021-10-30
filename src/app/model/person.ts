export class Person {
    id!: number;
    firstname!: string;
    lastname!: string;
    knownas!: string;
    phone!: string;
    email!: string;
    token!: string;
    status!: string;

    static empty: Person = { id: 0, firstname: '', lastname: '', knownas: '', phone: '', email: '', token: '', status: '' };

    constructor() { }
}
