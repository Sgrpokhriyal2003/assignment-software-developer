const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const {createLogger, format, transports} = require('winston');

dotenv.config();

const app = express();

//configure logger
const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' })
    ]
  });
  
if(process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.simple()
  }));
}


//middleware
app.use(cors());
app.use(express.json());


//mongo connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    logger.info(`connected to db`);
})
.catch((error) => {
    logger.error(`mongo connection error:`, error);
    process.exit(1);
});

//routes
const loadRoutes = require("./routes/loadRoutes");
const bookingRoutes = require("./routes/bookingRoute");

app.use('/load', loadRoutes);
app.use('/booking', bookingRoutes);

//error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'something went wrong!'
    })
})

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`server is running on port: ${PORT}`);
});
