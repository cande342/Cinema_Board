// board.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionalidadService } from '../../core/funcionalidad.service';
import { ListComponent } from './list/list.component';
import { ListSchema } from '../../models/list-schema';
import { TaskSchema } from '../../models/task-schema';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';

const initialValue = {
  id: '',
  title: '',
  description: '',
  priority: '',
};

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html', 
  imports: [CommonModule, ListComponent, CreateTaskComponent, 
            TextFieldModule, DragDropModule],
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() list?: ListSchema;
  lists: ListSchema[] = [];

  constructor(private funcionalidadService: FuncionalidadService) {}

  ngOnInit(): void {
    this.funcionalidadService.getBoardList$.subscribe({
      next: (lists: ListSchema[]) => {
        // Asigna directamente las listas recibidas del servicio
        this.lists = lists;
      },
      error: (error: string) => console.log('Ups! Tenemos un error:', error)
    });
  }

  onTaskAdded(task: TaskSchema): void {
    // Agrega la tarea directamente a la primera lista
    if (this.lists.length > 0) {
      this.lists[0].cards.push(task);
      this.funcionalidadService.addTaskToList(task, "0").subscribe(() => {
        // Aquí puedes realizar acciones adicionales después de agregar la tarea
      });
    }
  }
}
