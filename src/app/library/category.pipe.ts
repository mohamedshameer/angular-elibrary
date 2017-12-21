import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'categoryfilter',
})

export class CategoryFilterPipe implements PipeTransform {

  transform(books: any[], filter: any): any {
    if (!books || !filter) {
      return books;
    }
    return books.filter(book => (book.category != null && book.category.indexOf(filter) !== -1));
  }
}
