import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})

export class SearchFilterPipe implements PipeTransform {

  transform(books: any[], filter: any): any {
    if (!books || !filter) {
      return books;
    }
    return books.filter(book => (book.author.indexOf(filter) !== -1) || (book.name.indexOf(filter) !== -1));
  }
}
