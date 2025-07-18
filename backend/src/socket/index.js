module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join a room with user's ID (helps target a user specifically)
    socket.on("join_room", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // When cart is updated, emit to the user's room
    socket.on("cart_updated", ({ userId, product }) => {
      io.to(userId).emit("cart_updated", product);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
