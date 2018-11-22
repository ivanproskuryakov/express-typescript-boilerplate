import {App} from "./app/App";

const env = process.env.NODE_ENV || 'development';
const app = new App(env);

app.start();
