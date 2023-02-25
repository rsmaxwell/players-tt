import { FormGroup } from "@angular/forms";
import { Person } from "./person";

export class Register {
    firstname: string;
    lastname: string;
    knownas: string;
    email: string;
    password: string;

    constructor( ) {
        this.firstname = ''
        this.lastname = ''
        this.knownas = ''
        this.email = ''
        this.password = ''
    }

    static fromPerson(person: Person): Register {
        let reg = new Register()
        reg.firstname = person.firstname
        reg.lastname = person.lastname
        reg.knownas = person.knownas
        reg.email = person.email
        reg.password = ''
        return reg
    }
    
    static fromFormGroup(form: FormGroup): Register {
        let reg = new Register()
        reg.firstname = form.value.firstname!
        reg.lastname = form.value.lastname!
        reg.knownas = form.value.knownas!
        reg.email = form.value.email!
        reg.password = form.value.password!
        return reg
      }
}


