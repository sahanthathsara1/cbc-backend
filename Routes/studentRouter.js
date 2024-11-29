import express from 'express';
import {getStudents , createStudents,deleteStudent } from "../Controllers/studentController.js";  

const studentRouter = express.Router();

studentRouter.get("/",getStudents);

studentRouter.post("/",createStudents);

studentRouter.delete("/",deleteStudent);






export default studentRouter;



