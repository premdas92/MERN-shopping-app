## Auth Routes

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/refresh-token
- POST /api/auth/logout
*** Admin Dashboard

## Product Routes (No Auth)
- GET /api/products -> Get All products
- GET /api/products/:id -> Get particular product
- GET /api/products?page=1

## Product Routes (With Auth)
- Admin - POST /api/products -> Create a product
- Admin - PATCH /api/products/:id -> Update a product
- Admin - DELETE /api/products/:id -> Delete a product

## Cart Routes (With Auth)
- GET /api/cart -> Get current user's cart
- POST /api/cart -> Add to cart
- PATCH /api/cart/:productId -> Update product qty in cart
- DELETE /api/cart/:productId -> Remove from cart

## Order Routes (With Auth)
- POST /api/orders -> Place order from cart
- GET /api/orders -> Get user's orders
- Get /api/orders/:orderId -> Get specific order