import { LibraryService } from './services/library.service';
import { Book } from './model/book';
import { Component, OnInit } from '@angular/core';
import './sass/library.component.scss';
declare var firebase: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./sass/library.component.scss'],
  providers: [LibraryService],
})

export class LibraryComponent implements OnInit {
  books: any = [];
  renewBooks = [];
  public searchBox: string;
  public bookSearch: string;
  public isbnValue: string;
  public author: any;
  public category: any;
  public copies: any;
  public title: any;
  public filter: any;
  public sortDropdown: any;
  public sortList = [{ "name": "Title", "value": "title" },
  { "name": "Author", "value": "author" }, { "name": "UserName", "value": "user" }, { "name": "Issued Date", "value": "dateOfIssue" }]

  constructor(public libraryservice: LibraryService) { }
  ngOnInit() {
    var ref = firebase.database().ref('/');
    ref.child("books").once('value', (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach(snap => {
        this.books.push(snap.val());
      });
      console.log(this.books);
    });
    this.getRenewBooks();

  }

  addBook(copies: any, name: any, isbn: any, author: any) {
    var ref = firebase.database().ref('/');
    var issueDate = new Date();
    var renewByDate = new Date();
    renewByDate.setDate(issueDate.getDate() + this.libraryservice.numberofDays);
    var getBook = "user : shameer" + ",name:" + name + ",dateOfIssue:" + issueDate.toLocaleDateString('en-GB') + ",renewBy:" + renewByDate.toLocaleDateString('en-GB');
    console.log(getBook);
    ref.child("renew").push({ "user": "admin", "title": name, "dateOfIssue": issueDate.toLocaleDateString('en-GB'), "renewBy": renewByDate.toLocaleDateString('en-GB'), "isbn": isbn, "author": author });
    ref.child("books/" + isbn).update({ "copiesAvailable": copies - 1 });
    //alert("Book successfully claimed");
    //this.renewBooks.push(book);

  }
  getRenewBooks() {
    var ref = firebase.database().ref('/');
    ref.child("renew").once('value', (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach(snap => {
        var data = snap.val();
        data.key = snap.key;
        this.renewBooks.push(data);
      });
      console.log(this.renewBooks);
    })
  }

  renewBook(renewDate: string, key: any) {
    var nextDate = this.libraryservice.renewBook(renewDate, key);
    this.libraryservice.updateRenewedBook(this.renewBooks, key, nextDate);
  }

  returnBook(key: any, isbn: string) {
    var ref = firebase.database().ref('/');
    var book;
    //ref.child("renew").child(key).remove();
    ref.child("books").once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if (isbn == snap.key) {
          book = snap.val();
          console.log(snap.val());
          console.log(book.author);
          ref.child("books").child(isbn).update({ "author": book.author, "copiesAvailable": parseInt(book.copiesAvailable) + 1, "isbn": book.isbn, "name": book.name });
        }
      });

    });
    //ref.child("books").child(isbn).update({"author":book.author,"copiesAvailable":parseInt(book.copiesAvailable)+1,"isbn":book.isbn,"name":book.name});
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
    this.libraryservice.updateDeletedBook(this.books, isbn);
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
}
