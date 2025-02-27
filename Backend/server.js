

const express = require('express');
const http = require('http'); // Import HTTP module to create server
const { Server } = require('socket.io'); // Import Socket.IO
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');
const initializeQuizSocket = require('./src/sockets/quizSocket'); // Import the multiplayer quiz socket logic

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://grevocab-app-1-frontend.onrender.com',
        methods: ["POST", "GET", "PUT"]
    }
});

app.use(express.json());

app.use(cors({
    origin: 'https://grevocab-app-1-frontend.onrender.com',
    methods: ["POST", "GET", "PUT"]
}));


app.use('/api/words', require('./src/routes/wordRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/quiz', require('./src/routes/quizRoutes'));
app.use('/api', require('./src/routes/worddicRoutes'));
app.use('/api', require('./src/routes/pdfRoutes'));
app.use('/api/score', require('./src/routes/scoreRoutes'));
app.use('/api/user', require('./src/routes/streakRoutes'));
app.use('/api/avg', require('./src/routes/avgScoreRoutes'));
app.use('/api/', require('./src/routes/leaderBoardRoutes'));
app.use('/api/word', require('./src/routes/noteRoutes.js'));
app.use('/api', require('./src/routes/difficultyRoutes'));


initializeQuizSocket(io);

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


