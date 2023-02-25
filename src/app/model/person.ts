import { FormGroup } from "@angular/forms";

export class Person {
  id: number;
  firstname: string;
  lastname: string;
  knownas: string;
  phone: string;
  email: string;
  token: string;
  status: string;


  constructor() {
    this.id = 0
    this.firstname = ''
    this.lastname = ''
    this.knownas = ''
    this.phone = ''
    this.email = ''
    this.token = ''
    this.status = ''
  }

  static fromFormGroup(form: FormGroup): Person {
    let person = new Person()
    person.id = form.value.id!
    person.firstname = form.value.firstname!
    person.lastname = form.value.lastname!
    person.knownas = form.value.knownas!
    person.phone = form.value.phone!
    person.email = form.value.email!
    person.token = form.value.token!
    person.status = form.value.status!
    return person
  }
}
