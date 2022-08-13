import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
const ip = process.env.MONGO_DB_IP;
const port = process.env.MONGO_DB_PORT;
const host_port = process.env.HOST_PORT;
const mongo_url = "mongodb://" + ip + ":" + port + "/deall";
mongoose.connect(mongo_url,
    { useNewUrlParser: true, 
      useUnifiedTopology: true 
    },
);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));
app.use(cors());
app.use(express.json());
app.use(UserRoute);
//app.use('/login', (req, res) => {
//  res.send({
//    token: 'test123'
//  });
//});
app.listen(host_port, () => console.log('Server Up and Running on Port ' + host_port));