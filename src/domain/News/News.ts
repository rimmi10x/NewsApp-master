import { UUID } from "crypto";

export interface News {
    id: UUID,
    title: string,
    content: string
}