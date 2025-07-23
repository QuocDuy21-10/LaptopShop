# 💻 Laptop Shop Website (Node.js + Express + TypeScript)

# 1. Cài đặt dependencies
npm install

# 2. Tạo database và generate Prisma Client
npx prisma generate  
npx prisma migrate dev --name init

# 3. Chạy development
npm run dev

## 🧩 Tính năng chính

- ✅ Trang chủ hiển thị danh sách sản phẩm
- 🔍 Tìm kiếm sản phẩm theo:
  - Giá cả
  - Số lượng
  - Nhà sản xuất
- 📄 Trang chi tiết sản phẩm
- 🛒 Giỏ hàng và đặt hàng
- ✅ Xác thực người dùng với Passport.js
- 📦 CRUD:
  - Người dùng (User)
  - Sản phẩm (Product)
  - Đơn hàng (Order)
- 🔐 Phân quyền truy cập (Admin / User)
- ✅ Thông báo khi mua hàng thành công

---

## 🛠️ Công nghệ & Cấu hình

| Công nghệ             | Mô tả                                                                 |
|----------------------|------------------------------------------------------------------------|
| **Node.js**          | Backend server                                                         |
| **Express.js**       | Web framework xử lý routing, middleware                                |
| **TypeScript**       | Hỗ trợ viết code an toàn, dễ bảo trì                                   |
| **EJS**              | Template engine hiển thị giao diện                                     |
| **Passport.js**      | Xác thực người dùng (authentication & authorization)                   |
| **Nodemon**          | Tự động reload server khi thay đổi code                                |
| **Prisma ORM**       | Giao tiếp với database thông qua schema rõ ràng và migrations          |
| **MySQL**            | Cơ sở dữ liệu chính để lưu thông tin người dùng, đơn hàng, sản phẩm    |
| **Multer**           | Upload hình ảnh (ví dụ: avatar người dùng, ảnh sản phẩm)               |

---


