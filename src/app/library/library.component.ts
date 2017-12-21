import { LibraryService } from './services/library.service';
import { Book } from './model/book';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
declare var firebase: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./sass/library.component.scss'],
  providers: [LibraryService],
})

export class LibraryComponent implements OnInit {
  books: any = [];
  renewBooks: any = [];
  public searchBox: string;
  public bookSearch: string;
  public isbnValue: string;
  public author: any;
  public category: any;
  public copies: any;
  public title: any;
  public filter: any;
  public sortDropdown: string;
  public filterDropdown: string;
  public profile: any;
  public sortList = [{ "name": "Title", "value": "title" },
  { "name": "Author", "value": "author" }, { "name": "UserName", "value": "user" }, { "name": "Issued Date", "value": "dateOfIssue" }];
  public filterList = ["Computers", "Technology", "Fiction", "Science"];

  constructor(public libraryservice: LibraryService, private _cookieService: CookieService) { }

  ngOnInit() {
    var ref = firebase.database().ref('/');
    ref.child("books").once('value', (snapshot) => {
      snapshot.forEach(snap => {
        this.books.push(snap.val());
      });
    });
    this.getRenewBooks();
    var data = this._cookieService.get('profile');
    this.profile = JSON.parse(data);
  }

  getLibraryBook(book: Book) {
    var renewBook = this.libraryservice.getLibraryBook(book);
    this.renewBooks.push(renewBook);
    this.libraryservice.updateCopiesAvailable(book.isbn, -1, this.books);
  }

  getRenewBooks() {
    var ref = firebase.database().ref('/');
    ref.child("renew").once('value', (snapshot) => {
      snapshot.forEach(snap => {
        var data = snap.val();
        data.key = snap.key;
        this.renewBooks.push(data);
      });
    })
  }

  renewBook(renewDate: string, key: any) {
    var nextDate = this.libraryservice.renewBook(renewDate, key);
    this.libraryservice.updateRenewedBook(this.renewBooks, key, nextDate);
  }

  returnBook(key: any, isbn: any) {
    this.libraryservice.returnBook(key, isbn);
    this.renewBooks = this.libraryservice.deleteRenewedBook(this.renewBooks, key);
    this.libraryservice.updateCopiesAvailable(isbn, 1, this.books);
  }
  updateCopies(book: any) {
    this.libraryservice.updateBook(book);
  }
  addNewBook() {
    var book = new Book(this.author, this.category, this.title, this.isbnValue, this.copies);
    this.libraryservice.addNewBook(book);
    this.books.push(book);
  }
  deleteBook(isbn: any) {
    this.libraryservice.deleteBook(isbn);
    this.books = this.libraryservice.updateDeletedBook(this.books, isbn);
  }
  searchNewBook() {
    var xmlhttp = new XMLHttpRequest();
    var isbn = this.isbnValue;
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
    var library = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var booksInfo = JSON.parse(xmlhttp.responseText);
        console.log(booksInfo);
        if (booksInfo.totalItems > 0) {
          library.setBookInfo(booksInfo);
        }
        else {
          //alert("invalid");
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  public setBookInfo(booksInfo: any) {
    this.author = booksInfo.items[0].volumeInfo.authors[0];
    this.category = booksInfo.items[0].volumeInfo.categories[0];
    this.title = booksInfo.items[0].volumeInfo.title;
  }
  clearFilters() {
    this.filterDropdown = "";
  }
  deleteChip() {
    this.sortDropdown = "";
  }
}
