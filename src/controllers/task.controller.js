import { Task } from "../models/tasks.js";
import logger from "../logs/logger.js";

const getTasks = async(req, res) => {
    const { userId} = req.user;
    try {
        const tasks = await Task.findAllAsync({
            atributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where:{ userId }
        });
        res.json(tasks);

    } catch (error) {
        logger.error('Error getTasks' ,error);
        res.status(500).json({ message: "Server error"});
    }
}

const createTask = async(req, res) => {
    const { userId} = req.user;
    const { name } = req.body;
    try {
        const task = await Task.create({
            name,
            userId,
        });
        res.json(task);
    } 
    catch (error) {
        logger.error('Error createTask' ,error);
        res.status(500).json({ message: "Server error"});
    }
}


const getTask = async(req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            atributes: ['name', 'done'],
            where:{ id, userId}
        });
        res.json(task);

    } catch (error) {
        logger.error('Error getTask' ,error);
        res.status(500).json({ message: "Server error"});
    }
}

const updateTask = async(req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;

    try {
        const task = await Task.update({
            name,
        },
        {
            where: { id, userId },
        });

        if(task[0] === 0)
                return res.status(404).json({ message: "Task not found"});

        res.json(task);
    } 
    catch (error) {
        logger.error('Error updateTask' ,error);
        res.status(500).json({ message: "Server error"});
    }
}


const taskDone = async(req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { done } = req.body;
    try {
        const task = await Task.update({
            done,
        },
        {
            where: { id, userId },
        });

        if(task[0] === 0)
                return res.status(404).json({ message: "Task not found"});

        res.json(task);
    }
    catch (error) {
        logger.error('Error taskDone' ,error);
        res.status(500).json({ message: "Server error"});
    }
}

const deleteTask = async(req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    try {

        const task = await Task.destroy({where: { id, userId}});

        if(task === 0)
            return res.status(404).json({ message: "Task not found"});

        res.json(task);

    } catch (error) {
        logger.error("Error deleteTask: " + error);
        res.status(500).json({ message: error.message });
    }
} 


export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
};
