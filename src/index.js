import app from "./app.js";
import { sequelize } from "./database/database.js";
import 'dotenv/config'
import logger from "./logs/logger.js";

const port = process.env.PORT;

const main = async () => {
    // await sequelize.sync({force: true});
    await sequelize.sync();
    app.listen(port);
    console.log("server listening on port 3000");
    logger.info(`Server started on port${port}`);
}

app.get('/', (req, res) => {
    res.send(`Servidor Localhost:${port} Successfully`);
});

main();