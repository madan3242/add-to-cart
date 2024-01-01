require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const app = express ();

/**
 * Middlewares
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}));

//morgan middleware
app.use(morgan('common'));
//cors middleware
app.use(cors());

/**
 * Routes
 */
const user = require('./routes/userRoutes');
const product = require('./routes/productRoutes');
const order = require('./routes/orderRoutes');
const payment = require('./routes/paymentRoutes');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//Production error handler
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('<h1>Add To Cart - Backend</h1>')
})

module.exports = app