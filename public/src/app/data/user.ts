export class User{
    id : number;
	name : string;
    email : string;
    birthday : Date;
    tel : string;
    role : Role;
    datesignup : Date;
    civil : Civil;
    password : string;

    constructor(id : number, 
        name : string,
        email : string,
        birthday : Date,
        tel : string,
        role : number,
        datesignup : Date,
        civil : Civil){
            this.id = id
            this.name = name;
            this.email = email;
            this.birthday = birthday;
            this.tel = tel,
            this.role = role,
            this.datesignup = datesignup,
            this.civil = civil
    }
}

export enum Civil {
    Man,
    Woman,
    Undefined
}

export enum Role {
    User,
    Administrator,
    Teacher
}