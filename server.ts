import {App} from "./app/App";

const env = process.env.NODE_ENV || 'dev';
const app = new App(env);

app.start();
