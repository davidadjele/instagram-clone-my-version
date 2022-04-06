const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const userPostRoute = require('./routes/userPost')
const bodyParser = require('body-parser')

dotenv.config();


/* db connection */
mongoose
    .connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(()=> console.log('DB connection established'))
    .catch((err)=> console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', userPostRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(process.env.PORT || 5000, () => {
    console.log('Backend server is running!');
});