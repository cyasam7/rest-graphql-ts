import "reflect-metadata";
import { startServer } from "./app";

startServer().then(() => {
    console.log("Todo bien");
});
