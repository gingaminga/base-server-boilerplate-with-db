import RemoveToDoResponseDTO from "@dto/responses/to-do/remove-to-do.response.dto";
import ToDo from "@my-rdb/entities/to-do.entity";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import INVERSIFY_TYPES from "@utils/inversify-type";
import { inject, injectable } from "inversify";

export interface IToDoService {
  add(content: string, date: string): Promise<ToDo>;
  getAll(): Promise<ToDo[]>;
  modifyContent(id: number, content: string): Promise<ToDo>;
  remove(id: number): Promise<RemoveToDoResponseDTO>;
}

@injectable()
export class ToDoService implements IToDoService {
  private toDoRepository;

  constructor(@inject(INVERSIFY_TYPES.ToDoRepository) toDoRepository: typeof ToDoRepository) {
    this.toDoRepository = toDoRepository;
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

  /**
   * @description 할 일 수정하기
   * @param id
   * @param content 내용
   */
  async modifyContent(id: number, content: string) {
    await this.toDoRepository.modifyContent(id, content);

    const todo = await this.toDoRepository.findOneByOrFail({
      id,
    });

    return todo;
  }

  /**
   * @description 할 일 삭제하기
   * @param id
   */
  async remove(id: number) {
    const isSuccess = await this.toDoRepository.remove(id);
    const removeId = isSuccess ? id : -1;

    const dto = new RemoveToDoResponseDTO(removeId);

    return dto;
  }
}
