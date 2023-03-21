import express from "express";
import TodoController from "../controller/todo.controller";

const router  = express.Router();


router.post('/add-todo', TodoController.create);

router.get('/get-all-todos', TodoController.getAll);

router.get('/get-single/:id', TodoController.getSingle);

router.put('/update-todo/:id', TodoController.updateTodo);

router.delete('/delete-todo/:id', TodoController.deleteTodo);

export default router;


