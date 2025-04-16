mkdir miiverse && cd miiverse
npm init -y
npm install express socket.io

node const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("drawing", (data) => {
        socket.broadcast.emit("drawing", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

const socket = io();

// Chat functionality
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");

function sendMessage() {
    if (input.value.trim() !== "") {
        socket.emit("chat message", input.value);
        input.value = "";
    }
}

socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    messages.appendChild(li);
});

// Drawing functionality
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!drawing) return;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(event.offsetX, event.offsetY, 5, 0, Math.PI * 2);
    ctx.fill();

    socket.emit("drawing", { x: event.offsetX, y: event.offsetY });
}

socket.on("drawing", (data) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(data.x, data.y, 5, 0, Math.PI * 2);
    ctx.fill();
});
