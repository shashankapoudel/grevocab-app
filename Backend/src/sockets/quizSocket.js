// // src/sockets/quizSocket.js
// const { getQuizQuestions } = require('../controllers/quizController');

// module.exports = function (io) {
//     io.on('connection', (socket) => {
//         console.log(`User connected: ${socket.id}`);

//         // Join a quiz room
//         socket.on('joinRoom', async (roomId) => {
//             socket.join(roomId);
//             console.log(`User ${socket.id} joined room ${roomId}`);
//             io.to(roomId).emit('userJoined', { userId: socket.id });

//             // Fetch questions and start quiz for all users in the room
//             const quizQuestions = await getQuizQuestions({ limit: 10 }); // Fetch 10 questions
//             io.to(roomId).emit('quizStart', quizQuestions);
//         });

//         // Handle answer submission
//         socket.on('submitAnswer', ({ roomId, questionId, answer }) => {
//             const isCorrect = checkAnswer(questionId, answer); 
//             io.to(roomId).emit('answerResult', { userId: socket.id, isCorrect });
//         });

//         // Disconnect
//         socket.on('disconnect', () => {
//             console.log(`User disconnected: ${socket.id}`);
//         });
//     });
// };

// // Helper function for answer checking (replace with actual logic)
// function checkAnswer(questionId, answer) {
//     // Implement your actual answer-checking logic here
//     return true; // Example result
// }


// src/sockets/quizSockets.js

const quizSockets = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Join a quiz room
        socket.on('joinQuiz', ({ roomId, username }) => {
            socket.join(roomId);
            console.log(`${username} joined room ${roomId}`);
            io.to(roomId).emit('userJoined', { username });
        });

        // Start quiz and send first question
        socket.on('startQuiz', async (roomId) => {
            console.log(`Starting quiz in room ${roomId}`);
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/questions?limit=10`);
                const questions = response.data.data;

                console.log(`Emitting quizQuestions to room ${roomId}`); // Add this
                io.to(roomId).emit('quizQuestions', questions);
            } catch (error) {
                console.error('Error fetching quiz questions:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

module.exports = quizSockets;
