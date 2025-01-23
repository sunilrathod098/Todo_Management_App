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
 *   description: Todo management
 */

// Apply JWT verification middleware to all routes
router.use(verifyJWT);

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
 *         description: Missing or invalid fields
 */
router.post('/create',verifyJWT, createTodo);

/**
 * @swagger
 * /api/v1/todos/fetchAllTodos:
 *   get:
 *     summary: Get all todos for the authenticated user
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       404:
 *         description: No todos found
 */
router.get('/fetchAllTodos',verifyJWT, getAllTodos);

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
 *         description: The ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Invalid or missing fields
 *       404:
 *         description: Todo not found
 */
router.put('/update/:id',verifyJWT, updateTodo);

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
 *         description: The ID of the todo
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Todo not found
 */
router.delete('/delete/:id',verifyJWT, deleteTodo);

export default router;
