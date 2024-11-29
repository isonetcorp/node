import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateToken = (req, res, next) => {
    // Obtener el JWT de la cabecera de autenticación (asegúrate de usar 'authorization' en minúsculas)
    const authHeader = req.headers['authorization'];
    console.log('authHeader: ', authHeader);

    // Validar que el token esté en el formato 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token: ', token);

    // Si no hay token, retorna un status 401
    if (!token) return res.sendStatus(401);

    // Verificar y decodificar el token
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403); // Token inválido o expirado

        // Si el token es válido, adjuntar los datos del usuario a req.user
        console.log('user: ', user);
        req.user = user;
        next();
    });
};