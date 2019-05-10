interface question {
    type: typeQuestion,
    ask: string,
    answer: string,
    response: string;
    status: result
}

enum typeQuestion {
    MULTIPLE_CHOICE,
    ANSWER
}

enum result {
    CORRECT,
    INCORRECT
}

export class Qcm implements question {
    type: typeQuestion;
    ask: string;
    answer: string;
    response: string;
    status: result;

    option: {
        A: string,
        B: string,
        C: string,
        D: string
    }
    constructor(ask: string,
        optionA: string, optionB: string,
        optionC: string, optionD: string,
        answer: string) {
        this.type = typeQuestion.MULTIPLE_CHOICE;
        this.ask = ask;
        this.option.A = optionA;
        this.option.B = optionB;
        this.option.C = optionC;
        this.option.D = optionD;
        this.answer = answer;
    }
}