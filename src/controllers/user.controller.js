import logger from "../logs/logger.js";
import { User } from "../models/users.js";
import { Task } from "../models/tasks.js";
import { encriptar } from "../common/bycritp.js";

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "password", "status"],
        });
        res.json(users);
    } catch (error) {
        logger.error("Error getUsers: ", error);
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.json(user);
    } catch (error) {
        logger.error("Error createUser: " + error);
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ["id", "username", "status"],
        });
        if (!user) {
            return res.status(404).json({ message: " User not found" });
        }
        res.json(user);
    } catch (error) {
        logger.error("Error getUser: ", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res
                .status(400)
                .json({ message: "Username or password are required" });
    
        // Encriptar la contraseña manualmente
        const encryptedPassword = await encriptar(password);        

        const user = await User.update(
            { username, password: encryptedPassword },
            { where: { id } }
        );

        res.json(user);
    } 
    catch (error) {
        logger.error("Error createUser: " + error);
        res.status(500).json({ message: error.message });
    }
};

const activateInactivate = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        if (user.status === status) {
            return res.status(400).json({ message: "Status is the same as the current one." });
        }

        user.satus = status;
        await user.save();
        res.json(user);

    } catch (error) {
        logger.error("Error activateInactivate: " + error);
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async(req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.destroy(id);
        res.json({message: "User Deleted successfully"});
    } catch (error) {
        logger.error("Error deleteUser: " + error);
        res.status(500).json({ message: error.message });
    }
} 

const getTasks = async(req, res) => {
    const { id } = req.params; 

    try {
        const user = await User.findOne({ 
            attributes: ['username'],
            include: [{
                model: Task,
                attributes: ['name', 'done'],
                // where: {
                //     done: false,
                // }
            }],
            where: { id },
        });

        res.json(user);

    } catch (error) {
        logger.error("Error getTasks: " + error);
        res.status(500).json({ message: error.message });
    }
} 


export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getTasks,
};
