import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../models/task';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,

} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [
    ReactiveFormsModule
    ,CdkDropList, CdkDrag
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})

export class ToDoComponent implements OnInit{
toDoForm! : FormGroup;
tasks : Task[] = [];
inProgress : Task[] = [];
done : Task[]= [];
isEditEnabled:boolean = false;
updatedIndex:any;
constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      item:['' , Validators.required],
      description:['' , Validators.required],
      date:['', Validators.required],
      priority:['high', Validators.required],
      } )
  }
  addTask(){
    this.tasks.push({
      title: this.toDoForm.value.item,
      description:this.toDoForm.value.description,
      deadline:this.toDoForm.value.date,
      priority:this.toDoForm.value.priority,
      Completed: false
    });
    this.toDoForm.reset();
  }


  updateTask(){
    this.tasks[this.updatedIndex].title = this.toDoForm.value.item;
    this.tasks[this.updatedIndex].Completed = false;
    this.toDoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;
  }
  deleteTask(taskId:number){
    this.tasks.splice(taskId,1)
  }
  editTask(taskId: number , task:Task ){
    this.toDoForm.controls['item'].setValue(task.title);
    this.updatedIndex = taskId;
    this.isEditEnabled = true;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
