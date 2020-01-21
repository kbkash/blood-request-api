const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const requestRouter = require('./routes/requestRoutes');
const eventRouter = require('./routes/eventRoutes');
const bloodStatusRouter = require('./routes/bloodStatusRoutes');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorController')

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/blood_status', bloodStatusRouter)

app.all('*', (req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} server.`, 400));
})

app.use(errorHandler)

module.exports = app;