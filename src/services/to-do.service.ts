import ToDo from "@my-rdb/entities/to-do.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { injectable } from "inversify";

export interface IToDoService {
  add(content: string, date: string): Promise<ToDo>;
  getAll(): Promise<ToDo[]>;
}

@injectable()
export class ToDoService implements IToDoService {
  private toDoRepository;

  constructor() {
    this.toDoRepository = ToDoRepository;
  }

  /**
   * @description 할 일 추가하기
   * @param content 내용
   * @param date 날짜
   */
  async add(content: string, date: string) {
    const toDo = new ToDo();
    toDo.content = content;
    toDo.date = date;
    const newToDo = await this.toDoRepository.save(toDo);

    return newToDo;
  }

  /**
   * @description 전체 할 일 가져오기
   */
  async getAll() {
    const data = await this.toDoRepository.find();
    return data;
  }
}