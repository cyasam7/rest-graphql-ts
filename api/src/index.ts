import "reflect-metadata";
import { connect } from "./config/typeorm";
import { startServer } from "./app";

(async () => {
    await connect();
    const app = await startServer();
    app.listen(3000, () => {
        console.log("Se inicio correctamente");
    });
})();
