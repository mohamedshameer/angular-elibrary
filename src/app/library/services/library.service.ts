import { Injectable } from '@angular/core';
import { RenewBook } from '../model/renewBook';
import { Book } from '../model/book';
import { CookieService } from 'angular2-cookie/core';
declare var firebase: any;

@Injectable()
export class LibraryService {
  numberofDays = 7;

  constructor(private _cookieService: CookieService) { }
  getLibraryBook(book: Book): any {
    var ref = firebase.database().ref('/');
    var issueDate = new Date();
    var renewByDate = new Date();
    var bookFromDb;
    renewByDate.setDate(issueDate.getDate() + this.numberofDays);
    var data = this._cookieService.get('profile');
    var profile = JSON.parse(data);
    var renewBook = new RenewBook(book.author, issueDate.toLocaleDateString('en-GB'), book.isbn, renewByDate.toLocaleDateString('en-GB'), book.title, profile.name.givenName);
    var id = ref.child("renew").push(renewBook);
    renewBook.key = id.key;
    ref.child("books").once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if (book.isbn == snap.key) {
          bookFromDb = snap.val();
          ref.child("books").child(book.isbn).update({ "copiesAvailable": parseInt(bookFromDb.copiesAvailable) - 1 });
        }
      });

    });
    return renewBook;
  }

  updateCopiesAvailable(key: any, value: any, books: any) {
    for (let book of books) {
      if (book.isbn === key) {
        book.copiesAvailable = book.copiesAvailable + value;
      }
    }
  }

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

  updateBook(book: any) {
    var ref = firebase.database().ref('/').child("books");
    ref.child(book.isbn).update({
      "author": book.author,
      "category": book.category,
      "copiesAvailable": book.copiesAvailable,
      "title": book.title
    });
  }

  updateRenewedBook(renewBooks: any, key: string, renewDate: string) {
    for (let book of renewBooks) {
      if (book.key === key) {
        book.renewBy = renewDate;
      }
    }
  }

  updateDeletedBook(books: any, isbn: any) : any {
    books = books.filter(book => book.isbn !== isbn);
    return books;
  }

  returnBook(key: any, isbn: any) {
    var ref = firebase.database().ref('/');
    var book;
    ref.child("renew").child(key).remove();
    ref.child("books").once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if (isbn == snap.key) {
          book = snap.val();
          ref.child("books").child(isbn).update({ "copiesAvailable": parseInt(book.copiesAvailable) + 1 });
        }
      });

    });
  }
  deleteRenewedBook(renewBooks: any, key: any) : any {
    renewBooks = renewBooks.filter(book => book.key !== key);
    return renewBooks;
  }

}
