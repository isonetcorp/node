import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Status } from '../constants/index.js';
import { Task } from './tasks.js';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bycritp.js';

export const User = sequelize.define('users',{

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      validate :{
        notNull:{
          msg: 'Username must not be null',
        }
      } 
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notNull:{
          msg: 'Password must not be null',
        }
      } 
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: Status.ACTIVE,

      validate :{
        isIn:{
          args: [[Status.ACTIVE, Status.INACTIVE]],
          msg: 'Status must be either active or inactive'
        }
      } 
    },
  });

// //Relacion uno a muchos para usuario con tareas
// User.hasMany(Task, {
//   foreignKey: 'userId',   // Define 'userId' como clave foránea en Task
//   sourceKey: 'id',         // Se usa el 'id' de User como clave primaria
//   onDelete: 'CASCADE',  // Elimina las tareas relacionadas si se elimina el usuario
//   onUpdate: 'CASCADE'   // Actualiza 'userId' si el 'id' de User cambia
// });

// Task.belongsTo(User, {
//   foreignKey: 'userId',   // La misma clave foránea usada en 'hasMany' para asegurar consistencia
//   targetKey: 'id'         // Relaciona 'id' de User como el objetivo de la relación
// });

User.hasMany(Task);
Task.belongsTo(User);


//Encripctar password
User.beforeCreate(async (user) => {
try {
  user.password = await encriptar(user.password);
} catch (error) {
  logger.error(error.message);
  throw new Error('Error al encriptar la contraseña');
}
});

User.beforeUpdate(async (user) => {
  try {
    user.password = await encriptar(user.password);
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error al encriptar la contraseña');
  }
  });