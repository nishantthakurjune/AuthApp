const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
require('./Models/db')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000;
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

//hi
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
<<<<<<< HEAD
} )
app.get("/ping", (req, res)=>{
    res.json("pong")
})
=======
} )
>>>>>>> 19e67dc53513f615d31baebb7036bfe9d1118b97
