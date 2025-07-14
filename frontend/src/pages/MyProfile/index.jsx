import { useState } from "react";

const dummyOrders = [
  {
    id: "ORD12345",
    datePlaced: "14th Jul 2025, 08:25 pm",
    deliveredOn: "15th Jul 2025, 09:00 am",
    total: 164.99,
    items: [
      { name: "Onion", qty: 1, price: 40, image: "https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/74325fc4-5b13-4bbb-98a8-cd25df7167e6.jpeg" },
      { name: "Tomato", qty: 1, price: 45, image: "https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/98df9311-7dc6-44ab-92e6-fca8fdd4f23c.jpeg" },
      { name: "Surf Excel", qty: 1, price: 79.99, image: "https://cdn.zeptonow.com/production/tr:w-1280,ar-1176-1176,pr-true,f-auto,q-80/cms/product_variant/3e7dc030-5d2c-4799-812f-2632d43a2bcd.jpeg" },
    ],
    status: "delivered",
    address: "22/A, Krishna Nagar, Bangalore - 560001",
  },
];

const MyProfile = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
            <h2 className="text-lg font-semibold text-indigo-700">John Doe</h2>
            <p className="text-sm text-gray-500">johndoe@example.com</p>
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
                Order #{selectedOrder.id}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Placed on: {selectedOrder.datePlaced}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Delivered on: {selectedOrder.deliveredOn}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Delivery Address: {selectedOrder.address}
              </p>
              <h3 className="text-md font-semibold mb-2">Items:</h3>
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center mb-3">
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
                  Total: ₹{selectedOrder.total}
                </p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              {dummyOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="bg-gray-50 hover:bg-indigo-50 transition cursor-pointer rounded-lg p-4 mb-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex-1 px-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Order {order.status === "delivered" && "delivered ✅"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Placed at {order.datePlaced}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-md font-semibold text-gray-800">
                      ₹{order.total}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
