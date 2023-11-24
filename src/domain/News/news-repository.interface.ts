import { News } from "./News";

export abstract class INewsRepository{
    abstract GetAll(): Promise<News[]>
}