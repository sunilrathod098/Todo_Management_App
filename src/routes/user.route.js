import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    loginUser,
    registerUser,
    updateUser
} from "../controller/user.controller.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/all-users").get(getAllUsers)
router.route("/:userId").patch(updateUser)
router.route("/:userId").delete(deleteUser)


export default router;