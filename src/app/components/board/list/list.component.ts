import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { ListSchema } from '../../../models/list-schema';
import { TaskSchema } from '../../../models/task-schema';
import { FuncionalidadService } from '../../../core/funcionalidad.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, DragDropModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit {
  @Input() list: ListSchema = new ListSchema();

  constructor(private funcionalidad: FuncionalidadService) {}

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<TaskSchema[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}