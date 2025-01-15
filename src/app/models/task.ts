export interface Task{
  ID?:String,
  title:String,
  Completed:boolean,
  description?:string,
  priority?: 'high' | 'medium' | 'low',
  deadline?:Date
}
