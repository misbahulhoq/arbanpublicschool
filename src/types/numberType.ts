export interface Subject {
  name: string;
  fullMarks: number;
  obtMarks: number;
  slug: string;
  _id?: string;
}

export interface ResultData {
  _id?: string;
  uid: string;
  class: string;
  exam: string;
  examCode: string;
  subjects: Subject[];
  __v?: number;
}
