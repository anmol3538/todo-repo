const express = require("express");
const bodyparser = require('body-parser');
const cors = require("cors");
const connection = require('./src/config/database-config');
const router = require('./src/routes/auth')
const list = require('./src/routes/list')
const app = express();
app.use(cors()); // allows all origins (for testing only)
app.use(cors({
    origin: "http://localhost:5173", // allow requests from Vite dev server
    credentials: true               // if you're using cookies/auth headers
  }));
  
  app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json());
app.use('/api/v1/user', router)
app.use('/api/v1/list', list)
const {PORT} = require('./src/config/server-config')
app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);
    await connection();
    console.log("mongodb connected")
})