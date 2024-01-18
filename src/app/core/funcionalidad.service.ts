import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListSchema } from '../models/list-schema';
import { TaskSchema } from '../models/task-schema';
import { throwError, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FuncionalidadService {
  private lists: ListSchema[] = [
    { id: '0', name: 'Pendientes', cards: [] },
    { id: '1', name: 'Viendo', cards: [] },
    { id: '2', name: 'Terminadas', cards: [] },
  ];

  private readonly boardList = new BehaviorSubject<ListSchema[]>(this.lists);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map(lists => [...lists]));

  constructor() {
    // Cargar datos iniciales si es necesario
  }

  addTaskToList(task: TaskSchema, listId: string): Observable<void> {
    const listIndex = this.lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
      this.lists[listIndex].cards.push(task);
      this.boardList.next([...this.lists]);
      return new Observable<void>(observer => observer.complete()); // Devolver observable completado
    } else {
      return throwError('List not found');
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError('Error en el servidor');
  }
}