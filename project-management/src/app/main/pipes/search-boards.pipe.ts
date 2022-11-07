import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from 'src/app/share/models/board.model';

@Pipe({
  name: 'searchBoards',
})
export class SearchBoardsPipe implements PipeTransform {
  transform(searchItems: IBoard[], search: string = ''): IBoard[] {
    if (!search.trim()) {
      return searchItems;
    }
    return searchItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
