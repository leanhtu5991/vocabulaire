export class User{
    id : number;
	name : string;
    email : string;
    birthday : Date;
    tel : string;
    role : number;
    datesignup : Date;
    civil : Civil;

    constructor(){

    }
}

enum Civil {
    Man,
    Woman,
    Undefined
}