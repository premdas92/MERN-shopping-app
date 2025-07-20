import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const MyProfile = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    setUserOrders(user?.orders);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto flex bg-white rounded-lg shadow-md overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/4 bg-indigo-50 p-6 border-r border-gray-200">
          <div className="text-center mb-6">
            <img
              src="https://cdn.zeptonow.com/app/svg/dp_profile_icon.svg?tr=w-undefined,q-70"
              alt="User"
              className="rounded-full mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-indigo-700">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <nav className="space-y-4 text-sm">
            <p className="text-indigo-600 font-semibold">My Orders</p>
            <p className="text-gray-600 hover:text-indigo-600 cursor-pointer">
              Saved Addresses
            </p>
            <p className="text-gray-600 hover:text-indigo-600 cursor-pointer">
              Help & Support
            </p>
            <button className="mt-6 text-sm text-red-600 hover:underline">
              Logout
            </button>
          </nav>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full">
          {!selectedOrder && (
            <button
              onClick={() => navigate("/products")}
              className="text-sm text-indigo-600 hover:underline mb-4 pt-[20px] pl-[20px]"
            >
              ← Back to Homepage
            </button>
          )}
          <div className="flex-1 p-6 overflow-y-auto max-h-[85vh]">
            {selectedOrder ? (
              <div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-sm text-indigo-600 hover:underline mb-4"
                >
                  ← Back to Orders
                </button>
                <h2 className="text-xl font-semibold mb-2">
                  Order #{selectedOrder._id}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Placed on:{" "}
                  {moment(selectedOrder.placedAt).format(
                    "Do MMMM YYYY, h:mm A"
                  )}
                </p>
                {/* <p className="text-sm text-gray-500 mb-2">
                  Delivered on: {selectedOrder.deliveredOn}
                </p> */}
                <p className="text-sm text-gray-500 mb-4">
                  Delivery Address:{" "}
                  {`${selectedOrder.shippingDetails?.address}`}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Phone: {`${selectedOrder.shippingDetails?.phone}`}
                </p>
                <h3 className="text-md font-semibold mb-2">Items:</h3>
                {selectedOrder.items.map((item) => (
                  <div key={item?._id} className="flex items-center mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded mr-3 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.qty} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold">
                    Total: ₹{selectedOrder.totalAmount}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                {userOrders?.map((order) => (
                  <div
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-gray-50 hover:bg-indigo-50 transition cursor-pointer rounded-lg p-4 mb-4 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item._id}
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <span>+ {order.items.length - 3} more items</span>
                      )}
                    </div>
                    <div className="flex-1 px-4">
                      {/* <p className="text-sm font-semibold text-gray-700">
                        Order {order.status === "delivered" && "delivered ✅"}
                      </p> */}
                      <p className="text-xs text-gray-500">
                        Placed on{" "}
                        {moment(order.placedAt).format("Do MMMM YYYY, h:mm A")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-semibold text-gray-800">
                        ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
