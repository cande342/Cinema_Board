import { TaskSchema } from "./task-schema";

export class ListSchema {
    id: string;
    name: string;
    cards: TaskSchema[];
  
    constructor(id: string = '', name: string = '', cards: TaskSchema[] = []) {
        this.id = id;
        this.name = name;
        this.cards = cards;
      }
}
