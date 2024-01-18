import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { TaskSchema } from '../../../models/task-schema';
import { FuncionalidadService } from '../../../core/funcionalidad.service';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { generateUniqueId } from '../../Utils/utils';

type DropdownObject = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})


export class CreateTaskComponent implements OnInit {
  @Output() taskAdded: EventEmitter<TaskSchema> = new EventEmitter<TaskSchema>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private _ngZone: NgZone;
  @Input() task?: TaskSchema;
  @Input() listId?: string;

  formText?: string;
  createTask?: FormGroup;
  selectedPriority?: string;

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },
    { value: 'low', viewValue: 'Bajo' },
  ];

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private funcionalidad: FuncionalidadService
  ) {
    this._ngZone = ngZone;
    this.autosize = {} as CdkTextareaAutosize;

    this.createTask = this.fb.group({
      title: ['', Validators.required],
      priority: ['urgent', Validators.required],
      description: ['', Validators.required],
    });
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.selectedPriority = '';
    this.formText = 'Crear';
  }

  onFormAdd(): void {
    if (this.createTask && this.createTask.valid) {
      const formValue = this.createTask.value as TaskSchema;
      formValue.id = generateUniqueId();
  
      this.funcionalidad.addTaskToList(formValue, "0").subscribe(() => {
        
      });
    }
  }
}