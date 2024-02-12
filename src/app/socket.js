import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io';
import withMiddleware from 'next-connect/middleware';
import cors from 'cors';

// Create a Socket.io instance
const io = new Server({ path: '/api/socket.io' });

// Handle connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle socket events here
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Set up middleware for CORS origin restrictions
const middleware = withMiddleware(cors());

export default middleware((req, res) => {
  if (!res.socket.server.io) {
    console.log('Creating socket server');
    res.socket.server.io = io;
  }
  res.end();
});