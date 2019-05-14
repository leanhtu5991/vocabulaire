interface Question {
    type    : QuestionType,
    ask     : string,
    answer  : string,
    solution: string;
    result  : QuestionResult;
}

export enum QuestionType {
    MULTIPLE_CHOICE,
    ANSWER
}

export enum QuestionResult {
    CORRECT,
    INCORRECT
}

export enum QCMResponse {
    optionA = "A",
    optionB = "B",
    optionC = "C",
    optionD = "D"
}

export class QuestionQCM implements Question {
    type    : QuestionType;
    ask     : string;
    answer  : string;
    solution: string;
    result  : QuestionResult;

    optionA : string;
    optionB : string;
    optionC : string;
    optionD : string;

    constructor(ask: string,
        optionA: string, optionB: string,
        optionC: string, optionD: string,
        solution: QCMResponse) {
        this.type = QuestionType.MULTIPLE_CHOICE;
        this.ask = ask;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.solution = solution;
    }
}