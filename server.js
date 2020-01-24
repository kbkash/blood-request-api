const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});
const app = require('./app');

const db = process.env.DATABASE || process.env.DATABASE_LOCAL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database successfuly connected.");
}).catch(err=>{
    console.log(err);
})

const port = process.env.PORT || 3000;
/* Updated the comment*/
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})
