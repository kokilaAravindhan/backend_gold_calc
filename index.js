
import express from 'express';
import cors from 'cors';
import authrouter from './routes/app-users.js';
import connectToDb from './db-utils/mongodb_connection.js';

const app = express();

const PORT = process.env.PORT || 5050;

// Top/Global Level await
await connectToDb();

app.use(express.static('public'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authrouter);

// path params
app.get('/api/:name', (req, res) => {

    // Get the path params
    res.send({ path: req.params, query: req.query });
  });
  
 
app.listen(5050,()=>{console.log("successfully port is running")});