export class Word{
    id : number;
    word : string;
    idbox : number;
    translate : string;
    type : number;
	example1 : string;
	example2 : string;
	// iduser : number;
	// idbox : number;
	// validatetime : number;
    // status : number;
    
    constructor(id : number, word : string, translate : string, type: number, idbox : number, example1: string, example2: string){
        this.id = id;
        this.word = word;
        this.translate = translate;
        this.type = type;
        this.idbox = idbox;
        this.example1 = example1,
        this.example2 = example2
    }
}