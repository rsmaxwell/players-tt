import { Person } from "./person";

export class Register {
    firstname: string = '';
    lastname: string = '';
    knownas: string = '';
    email: string = '';
    password: string = '';

    constructor( user: Person ) {
        this.firstname = user.firstname
        this.lastname = user.lastname
        this.knownas = user.knownas
        this.email = user.email
     }
}


