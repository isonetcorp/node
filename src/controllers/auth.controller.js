import logger from "../logs/logger.js";
import { User } from "../models/users.js";
import { comparar } from "../common/bycritp.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const login = async(req, res) => {
    try 
    {
        const { username, password } = req.body;
        const user = await User.findOne({where: {username}});

        if (!user) 
            return res.status(404).json({message: 'User not found'});
        
        if(!await comparar(password, user.password)) 
            return res.status(403).User({message: 'User no autorizado'});

        const secret = process.env.JWT_SECRET;
        const seconds = process.env.JWT_EXPIRES_SECONDS;
        const token = jwt.sign({userId: user.id}, secret, { expiresIn: eval(seconds)});
        res.json({token});
    } 
    catch (error) 
    {
        logger.error('Error login ', + error);
        res.status(500).json({message: 'Server error'})
    }
};

export default {
    login
};