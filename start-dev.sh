#!/bin/bash

echo "🚀 Starting BrauComputer Development Environment..."

# Kill any existing processes on port 3000
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start React Dev Server in background
echo "📦 Starting React Dev Server..."
BROWSER=none npm run dev:react &
REACT_PID=$!

# Wait for React to be ready
echo "⏳ Waiting for React Dev Server to start..."
sleep 10

# Check if React is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ React Dev Server is ready!"
    echo "⚡ Starting Electron..."
    npm run dev:electron
else
    echo "❌ React Dev Server failed to start"
    kill $REACT_PID 2>/dev/null || true
    exit 1
fi

# Cleanup on exit
trap 'echo "🛑 Shutting down..."; kill $REACT_PID 2>/dev/null || true; exit 0' INT TERM
