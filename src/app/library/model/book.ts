export class Book {
  author: string;
  category: string;
  copiesAvailable: string;
  isbn: string;
  title: string;

  constructor(author : any , category: any , title:any, isbn : any , copiesAvailable : any){
    this.author = author;
    this. category = category;
    this.title = title;
    this.isbn = isbn;
    this.copiesAvailable = copiesAvailable;
  }
}
