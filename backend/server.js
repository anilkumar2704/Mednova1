require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const requestRoutes = require('./src/routes/requests');
const nurseRoutes = require("./src/routes/nurses");
const emergencyRoutes = require("./src/routes/emergency");

const app = express();
const server = http.createServer(app);

// ✅ Allow multiple origins for frontend (5173, 5174, 3000)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Socket.IO with same CORS policy
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use("/api/nurses", nurseRoutes);
app.use("/api/emergency", emergencyRoutes);

// basic health
app.get('/api/ping', (req, res) => res.json({ ok: true, ts: Date.now() }));

// Socket.IO events
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join_request', ({ requestId }) => {
        if (!requestId) return;
        socket.join(`req_${requestId}`);
    });

    socket.on('driver_location', ({ requestId, coords, driverId }) => {
        io.to(`req_${requestId}`).emit('driver_location', {
            requestId,
            coords,
            driverId,
            timestamp: Date.now()
        });
    });

    socket.on('request_status_change', ({ requestId, status }) => {
        io.to(`req_${requestId}`).emit('request_status_change', {
            requestId,
            status
        });
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

// start
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI)
    .then(() => {
        server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Failed to connect DB:', err);
    });

module.exports = { app, io };
