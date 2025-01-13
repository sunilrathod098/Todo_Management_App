import { ApiError } from '../config/ApiError.js';
import { ApiResponse } from '../config/ApiResponse.js';
import { asyncHandler } from "../config/asyncHandler.js";
import { Todo } from '../model/todo.model.js';
import mongoose from 'mongoose';

//create new todos
const createTodo = asyncHandler(async (req, res) => {
    const { title, description, complete } = req.body;
    // console.log("Request Body:", req.body);
    if (!title || !description || complete === undefined) {
        throw new ApiError(400, "All felids are required")
    }

    const userId = req.user._id
    const newTodo = await Todo.create({
        title,
        description,
        complete: complete || false,
        user: userId
    });
    if (!newTodo) {
        throw new ApiError(500, "Failed to create new Todos")
    }

    return res.status(201).json(new ApiResponse(
        200,
        "Todo created successfully",
        newTodo
    ));
});


//get all todos by userId
const getAllTodos = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const todo = await Todo.find({
        user: userId
    });
    if (!todo || todo.length === 0) {
        throw new ApiError(404, "No todo's found")
    }

    return res.status(201).json(new ApiResponse(
        200,
        "Todos found successfully",
        todo
    ));
});


//update todos
const updateTodo = asyncHandler(async (req, res) => {
    const { title, description, complete } = req.body;
    const todoId = req.params.id;

    if (!title || !description || !complete === undefined) {
        throw new ApiError(400, "All fields are required")
    }
    const todo = await Todo.findByIdAndUpdate(todoId, {
        title,
        description,    
        complete
    },
        {
            new: true
        })
    if (!todo) {
        throw new ApiError(404, "Todo not found or you do not have permission to update it.")
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Todo updated successfully",
        todo
    ));
})



//delete todos
const deleteTodo = asyncHandler(async (req, res) => {
    const todoId = req.params.id;
    const userId = req.user._id.toString(); // Convert ObjectId to string

    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(404, "Todo not found or you do not have permission to delete it.");
    }

    // Compare user ID
    if (todo.user.toString() !== userId) {
        throw new ApiError(403, "You do not have permission to delete this todo.");
    }

    // Delete the Todo
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    return res.status(200).json(new ApiResponse(
        200,
        "Todo deleted successfully.",
        deletedTodo
    ));
});


export {
    createTodo, deleteTodo, getAllTodos, updateTodo
};
