// data ini di ambil get genre postman, sudah di convert ke ts, kemudian di panggil di file columns
export interface Genre{
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    movies: string[]
  }