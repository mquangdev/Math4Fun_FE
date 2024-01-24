import { Question } from './question.models';

export class Course {
  id!: string;
  description?: string;
  name?: string;
  image?: string;
  totalMember?: number;
  chapterList?: Chapter[];
}

export class Chapter {
  id!: string;
  title?: string;
  index?: number;
  subTitle?: string;
  instruction?: string;
  status?: boolean;
  lessonList?: Lesson[];
}

export class Lesson {
  id!: string;
  title?: string;
  status?: boolean;
  expGained?: number;
  index?: number;
  createdDate?: string;
  questionList?: Question[];
}
