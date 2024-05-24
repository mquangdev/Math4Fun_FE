export class Answer {
  id?: string;
  text?: string;
  value?: string;
}
export class Pair {
  text?: string;
  value?: string;
}

export class Question {
  id?: string;
  text?: string;
  image?: any;
  type?: number;
  value?: any;
  status?: any;
  lessonId?: string;
  lesson?: any;
  answerList?: Answer[];
  isWrong?: boolean;
  index?: number;
  textBonus?: string;
  isAiGen?: boolean;
}
