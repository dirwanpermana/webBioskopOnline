import express from "express";
import { deleteTheater, getTheaterDetail, getTheaters, postTheater, putTheater } from "../../controllers/theaterController";
import { theaterSchema } from "../../utils/zodSchema";
import { validateRequest } from "../../middlewares/validateRequest";

const theaterRoutes = express.Router();

theaterRoutes.get('/theaters', getTheaters); //get data theaters
theaterRoutes.get('/theaters/:id', getTheaterDetail); //get data
theaterRoutes.post('/theaters', validateRequest(theaterSchema), postTheater); //utk validate request
theaterRoutes.put('/theaters/:id', validateRequest(theaterSchema), putTheater); //utk validate request
theaterRoutes.delete('/theaters/:id', deleteTheater); //delete data gaperlu 

export default theaterRoutes;