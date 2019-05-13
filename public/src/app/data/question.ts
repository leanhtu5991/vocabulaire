interface question {
    type: typeQuestion,
    ask: string,
    answer: string,
    response: string;
    status: result;
}

export enum typeQuestion {
    MULTIPLE_CHOICE,
    ANSWER
}

export enum result {
    CORRECT,
    INCORRECT
}

export enum responseQCM {
    optionA = "A",
    optionB = "B",
    optionC = "C",
    optionD = "D"
}

export class Qcm implements question {
    type: typeQuestion;
    ask: string;
    answer: string;
    response: string;
    status: result;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;

    constructor(ask: string,
        optionA: string, optionB: string,
        optionC: string, optionD: string,
        answer: responseQCM) {
        this.type = typeQuestion.MULTIPLE_CHOICE;
        this.ask = ask;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.answer = answer;
    }
}