import { SearchFilterPipe } from './searchfilter.pipe';

import { Component, OnInit } from '@angular/core';

declare var firebase: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
})

export class LibraryComponent implements OnInit {
  books: any = [];
  numberofDays = 7;
  renewBooks = [];
  public searchBox: string;

  ngOnInit() {
    var ref = firebase.database().ref('/');
    ref.child("books").once('value', (snapshot) => {
      console.log(snapshot.val());
      snapshot.forEach(snap => {
        this.books.push(snap.val());
      });
      console.log(this.books);
    });

  }

  addBook(copies: any, name: any, isbn: any, author: any) {
    var ref = firebase.database().ref('/');
    var issueDate = new Date();
    var renewByDate = new Date();
    renewByDate.setDate(issueDate.getDate() + this.numberofDays);
    var getBook = "user : shameer" + ",name:" + name + ",dateOfIssue:" + issueDate.toLocaleDateString('en-GB') + ",renewBy:" + renewByDate.toLocaleDateString('en-GB');
    console.log(getBook);
    ref.child("renew").push({ "user": "admin", "name": name, "dateOfIssue": issueDate.toLocaleDateString('en-GB'), "renewBy": renewByDate.toLocaleDateString('en-GB'), "isbn": isbn, "author": author });
    ref.child("books/" + isbn).update({ "author": author, "copiesAvailable": copies - 1, "isbn": isbn, "name": name });
    alert("Book successfully claimed");

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

  renewBook(author: any, dateOfIssue: any, isbn: any, name: any, renewDate: string, key: any) {
    var nextDate = new Date(renewDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
    nextDate.setDate(nextDate.getDate() + this.numberofDays);
    console.log(nextDate);
    var ref = firebase.database().ref('/').child("renew");
    ref.child(key).update({
      "author": author, "dateOfIssue": dateOfIssue, "isbn": isbn, "name": name, "renewBy": nextDate.toLocaleDateString('en-GB'),
      "user": "admin"
    });
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

  addNewBook(isbn: any) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var x = JSON.parse(xmlhttp.responseText);
        console.log(x.items);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }



}
