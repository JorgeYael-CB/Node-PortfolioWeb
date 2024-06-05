export class QuestionEntity {

  constructor(
    public title:string,
    public question:string,
    public date: Date,
    public user:any,
    public answers: any[],
  ){};

}