import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortColumnsTasks',
})
export class SortColumnsTasksPipe implements PipeTransform {
  transform<T extends { order: number }>(arr: T[]): T[] {
    const arr2 = [...arr];
    return arr2.sort((a, b) => a.order - b.order);
  }
}
