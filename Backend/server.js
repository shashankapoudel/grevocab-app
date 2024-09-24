
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors')

// require('dotenv').config();


dotenv.config();


connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT"]
}));



app.use('/api/words', require('./src/routes/wordRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/quiz', require('./src/routes/quizRoutes'))
app.use('/api', require('./src/routes/worddicRoutes'))
app.use('/api', require('./src/routes/pdfRoutes'))
// app.use('/api/openai', require('./src/routes/openaiRoutes'))


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

