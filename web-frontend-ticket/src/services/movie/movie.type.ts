// file type respon api movie yg di convert ts dari json postman
import type { Genre } from "../genre/genre.type"
import type { Theater } from "../theater/theater.type"

export interface Movie {
    _id: string;
    title: string;
// pick --> ambil field id dan name dari 2 api
    genre: Pick<Genre, "_id" | "name">;
    theaters: Pick<Theater,"_id" | "name">[];
    description: string;
    thumbnail: string;
    price: number;
    available: boolean;
    bonus: string;
    thumbnailUrl: string;
    id: string;
  }