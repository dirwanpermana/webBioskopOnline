import express from 'express'
import { deleteGenre, getGenreDetail, getGenres, postGenre, putGenre } from '../../controllers/genreController'
import { validateRequest } from '../../middlewares/validateRequest'
import { genreSchema } from '../../utils/zodSchema'

const genreRoutes = express.Router();

genreRoutes.get('/genres', getGenres); //get data
genreRoutes.get('/genres/:id', getGenreDetail); //get data
genreRoutes.post('/genres', validateRequest(genreSchema), postGenre); //utk validate request
genreRoutes.put('/genres/:id', validateRequest(genreSchema), putGenre);  //update data
genreRoutes.delete('/genres/:id', deleteGenre); //delete data gaperlu validate karena ga ngirim body

export default genreRoutes
