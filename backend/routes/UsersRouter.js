import express from "express";
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controller/UserController.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js"

const router = express.Router();
console.log("router user");
router.get('/users',verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser,adminOnly, getUsersById);
router.post('/users', verifyUser,adminOnly, createUsers);
router.patch('/users/:id', verifyUser,adminOnly, updateUsers);
router.delete('/users/:id',verifyUser,adminOnly,  deleteUsers);

export default router;