import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true
});

// join a request room
export function joinRequestRoom(requestId) {
    socket.emit("join_request", { requestId });
}

// driver sends location
export function sendDriverLocation(requestId, lng, lat, driverId) {
    socket.emit("driver_location", { requestId, coords: [lng, lat], driverId });
}

// listeners
socket.on("driver_location", (payload) => {
    console.log("driver location update", payload);
});

socket.on("request_status_change", (payload) => {
    console.log("status change", payload);
});

export default socket;
