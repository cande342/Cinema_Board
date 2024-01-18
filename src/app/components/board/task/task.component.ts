import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskSchema } from '../../../models/task-schema';
import { ListSchema } from '../../../models/list-schema';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: TaskSchema = new TaskSchema;
  @Input() list: ListSchema =  new ListSchema;

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  }

}
