const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config.env' });

const app = express();

//setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); 
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.render('index');
});
//routes
app.use('/api/v1/stores', require('./routes/stores.route'));
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});