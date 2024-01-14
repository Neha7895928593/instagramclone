

const express = require('express');
require('./model/mongodb.js')
const authroutes=require('./Routes/AuthRoutes.js')
const postroutes=require('./Routes/postRoutes.js')


const cors=require('cors')
const app = express();


const dotenv = require('dotenv')
dotenv.config(); 



app.use(express.json()); 
app.use(cors());
app.use('/api/auth',authroutes)
app.use('/api/post',postroutes)



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
