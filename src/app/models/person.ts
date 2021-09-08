export class Person {
    id!: string;
    firstname!: string;
    lastname!: string;
    knownas!: string;
    email!: string;
    token!: string;
    status!: string;

    static empty: Person = { id: '', firstname: '', lastname: '', knownas: '', email: '', token: '', status: '' };

    constructor() { }
}
