export class Word{
    id : number;
	word : string;
	translate : string;
	// example1 : string;
	// example2 : string;
	// iduser : number;
	// idbox : number;
	// validatetime : number;
    // status : number;
    
    constructor(id : number, word : string, translate : string){
        this.id = id;
        this.word = word;
        this.translate = translate;
    }
}