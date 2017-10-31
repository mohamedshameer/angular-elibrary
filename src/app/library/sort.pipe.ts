import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'sortbooks',
})

export class SortBooksPipe implements PipeTransform {

  transform(books: any[], filter: any): any {
    if (!books || !filter) {
      return books;
    }
    books.sort((a: any, b: any) => {
        console.log(a.author);
        if (a.filter < b.filter ){
            return -1;
        }else if( a.filter > b.filter ){
            return 1;
        }else{
            return 0;
        }
    });
    return books;
  }
}
