import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})

export class SearchFilterPipe implements PipeTransform {

  transform(books: any[], filter: any): any {
    if (!books || !filter) {
      return books;
    }
    return books.filter(book => (book.author.indexOf(filter) !== -1) || (book.title.indexOf(filter) !== -1)
     || (book.user != null && book.user.indexOf(filter) !== -1) 
     || (book.dateOfIssue != null && book.dateOfIssue.indexOf(filter) !== -1));
  }
}
