import { Injectable } from '@angular/core';
import { Book } from '../model/book';

declare var firebase: any;

@Injectable()
export class LibraryService {
  numberofDays = 7;

  addNewBook(book: Book) {
    var ref = firebase.database().ref('/');
    ref.child("books").child(book.isbn).set(book);
  }

  deleteBook(isbn: any) {
    var ref = firebase.database().ref('/');
    ref.child("books").child(isbn).remove();
  }

  renewBook(renewDate: string, key: string): string {
    var nextDate = new Date(renewDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
    nextDate.setDate(nextDate.getDate() + this.numberofDays);
    var ref = firebase.database().ref('/').child("renew");
    ref.child(key).update({
      "renewBy": nextDate.toLocaleDateString('en-GB')
    });
    return nextDate.toLocaleDateString('en-GB');
  }

  updateBook(book : any) {
    var ref = firebase.database().ref('/').child("books");
    ref.child(book.isbn).update({
      "author": book.author,
      "category" : book.category,
      "copiesAvailable": book.copiesAvailable,
      "title" : book.title
    });
  }

  updateRenewedBook(renewBooks: any, key: string, renewDate: string) {
    for (let book of renewBooks) {
      if (book.key === key) {
        book.renewBy = renewDate;
      }
    }
  }

  updateDeletedBook(books: any, isbn : any) {
    for (let book of books) {
      if (book.isbn === isbn) {
        books.pop(book);
      }
    }
  }

}
