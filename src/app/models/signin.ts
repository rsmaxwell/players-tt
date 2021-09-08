
export class Credentials{
    username: string = ''
    password: string = ''

    constructor( ) { }
}

export class Signin {
    signin: Credentials;

    constructor( credentials: Credentials ) {
        this.signin = credentials
     }
}
