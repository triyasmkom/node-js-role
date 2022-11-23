import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize";
import router from "./routes/UsersRouter.js";
import ProductsRouter from "./routes/ProductsRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import CronJob from "node-cron";

import dotenv from "dotenv";
import {initScheduledJobs} from "./cron/ScheduleJobs.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});
// generate table
//(async ()=>{ await db.sync()})();

app.set("port", process.env.APP_PORT||5000);

// session
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie:{
        secure: 'auto' //jika menggunakan http (false) https (true) http/https (auto)
    }
}));

// middle ware
app.use(cors({
    credentials: true, // client menyertakan credential berserta cookie
    origin: 'http:/localhost:3000' // alamat yang diijinkan untuk mengakses API kita
    }));

app.use(express.json());  // agar API dapat menerima data Json
app.use(router);
app.use(ProductsRouter);
app.use(AuthRouter);
// membuat table session
//store.sync();

initScheduledJobs();



app.listen(app.get("port"),()=>{
    console.log(`Server up and running in port ${app.get("port")}`);
});
