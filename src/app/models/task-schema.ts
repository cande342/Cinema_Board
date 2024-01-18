export class TaskSchema {
    id: string;
    title: string;
    description: string;
    priority: string;
  
    constructor(id: string = '', title: string = '', description: string = '', priority: string = '') {
      this.id = id;
      this.title = title;
      this.description = description;
      this.priority = priority;
    }
}
