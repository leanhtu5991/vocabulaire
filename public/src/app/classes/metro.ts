import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Metro{
    public id : Number
    public name : String
    constructor(private i: Number, private n: String) {
        this.id = i;
        this.name = n;
    }
}