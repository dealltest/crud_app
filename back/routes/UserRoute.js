import express from "express";
import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    login
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', login);

export default router;