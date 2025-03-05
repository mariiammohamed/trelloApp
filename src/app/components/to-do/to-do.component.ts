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
      item:['' , [Validators.required , Validators.minLength(3)]],
      description:['' , [Validators.required  , Validators.minLength(10) , Validators.maxLength(30)]],
      date:['', Validators.required],
      priority:['high', Validators.required],
      } )
  }

  // Helper function to check form control errors
  hasError(controlName: string, errorName: string) {
    return this.toDoForm.get(controlName)?.hasError(errorName) &&
           this.toDoForm.get(controlName)?.touched;
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

//update task
  updateTask(){
    this.tasks[this.updatedIndex].title = this.toDoForm.value.item;
    this.tasks[this.updatedIndex].deadline = this.toDoForm.value.date;
    this.tasks[this.updatedIndex].priority = this.toDoForm.value.priority;
    this.tasks[this.updatedIndex].description = this.toDoForm.value.description;
    this.tasks[this.updatedIndex].Completed = false;
    this.toDoForm.reset();
    this.updatedIndex = undefined;
    this.isEditEnabled = false;
  }
//edit task
  editTask(taskId: number , task:Task ){
    this.toDoForm.controls['item'].setValue(task.title);
    this.toDoForm.controls['description'].setValue(task.description);
    this.toDoForm.controls['priority'].setValue(task.priority);
    this.toDoForm.controls['date'].setValue(task.deadline);
    this.updatedIndex = taskId;
    this.isEditEnabled = true;
  }
//delete task
  deleteTask(taskId:number){
    this.tasks.splice(taskId,1)
  }

  deleteInprogressTask(taskId:number){
    this.inProgress.splice(taskId,1)
  }
  deleteDoneTask(taskId:number){
    this.done.splice(taskId,1)

  }

  //drop using Angular Matriel
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
