import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controller/todo.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         complete:
 *           type: boolean
 *           description: The status of the todo
 */

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo related operations
 */

/**
 * @swagger
 * /api/v1/todos/create:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: The todo was successfully created
 *       400:
 *         description: Bad Request
 */
router.route('/create').post(verifyJWT, createTodo);

/**
 * @swagger
 * /api/v1/todos/getAllTodos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of todos
 */
router.route('/getAllTodos').get(verifyJWT, getAllTodos);

/**
 * @swagger
 * /api/v1/todos/update/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was updated
 *       404:
 *         description: Todo not found
 */
router.route('/update/:id').put(verifyJWT, updateTodo);

/**
 * @swagger
 * /api/v1/todos/delete/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: The todo was deleted
 *       404:
 *         description: Todo not found
 */
router.route('/delete/:id').delete(verifyJWT, deleteTodo);

export default router;
