import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/share/models/auth.model';
import { ITask } from 'src/app/share/models/task.model';

@Pipe({
  name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: ITask[], args: [IUser[], string]): ITask[] {
    if (args[1] === 'allUsers') {
      return tasks;
    }
    const filteredTasks = tasks.filter((task) => {
      const currentUser = args[0].find((user) => user.login === args[1]);
      return task.userId === currentUser?.id;
    });
    return filteredTasks;
  }
}
