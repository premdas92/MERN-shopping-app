import socket from "../socket/socket";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateItemFromSocket } from "../slices/cartSlice";

const SocketJoiner = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      socket.emit("join_room", user._id);
      console.log("Joined room:", user._id);
    }
  }, [user]);
  useEffect(() => {
    const handleCartChange = (product) => {
      dispatch(updateItemFromSocket({
        productId: product._id,
        quantity: product.quantity,
      }));
    };

    socket.on("cart_updated", handleCartChange);
    return () => socket.off("cart_updated", handleCartChange);
  }, [dispatch]);

  return null; // invisible component
};

export default SocketJoiner;
