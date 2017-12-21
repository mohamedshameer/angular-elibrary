export class RenewBook {
  author: string;
  dateofIssue: string;
  isbn: string;
  renewBy : string;
  title: string;
  user : string;
  key : string;

  constructor(author : any , dateofIssue: any , isbn:any, renewBy : any , title : any , user: any){
    this.author = author;
    this. dateofIssue = dateofIssue;
    this.title = title;
    this.isbn = isbn;
    this.renewBy = renewBy;
    this.user = user;
  }
}
