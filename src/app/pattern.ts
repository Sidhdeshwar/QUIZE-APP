
export interface option {
    text: string;
    correct ?: boolean;
}

export interface Pattern {
    explanation:string;
    options: option[];
    questionText:string;
    myAnswer : number;
}