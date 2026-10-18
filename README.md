# Demo React, Express và MongoDB

Demo CRUD sinh viên với luồng:

```text
React Bootstrap → Axios → Express API → MongoDB
```

Backend có đủ các endpoint:

- `GET /api/health`: kiểm tra API.
- `GET /api/students`: lấy danh sách.
- `POST /api/students`: thêm sinh viên.
- `PATCH /api/students/:id`: sửa sinh viên.
- `DELETE /api/students/:id`: xóa sinh viên.

## Chạy project

Cần Node.js và MongoDB local đang chạy. Từ thư mục này:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item client/.env.example client/.env
npm install
```

Mở hai terminal tại thư mục project.

Terminal 1:

```powershell
cd backend
npm run dev
```

Terminal 2:

```powershell
cd client
npm run dev
```

Mở `http://localhost:5173`. Backend chạy ở `http://localhost:3006`. Health check: `http://localhost:3006/api/health`.

## Đọc code khi trình bày

1. `backend/server.js`: model `Student`, bốn route CRUD và kết nối MongoDB.
2. `client/src/api.js`: bốn hàm gọi các route bằng Axios.
3. `client/src/App.jsx`: state form và danh sách, tải dữ liệu, thêm/sửa/xóa.
4. `client/src/main.jsx`: nạp Bootstrap CSS. Giao diện dùng các component cơ bản từ React Bootstrap.

Lời dẫn: “React gửi request bằng Axios đến Express. Express dùng Mongoose để đọc hoặc ghi MongoDB rồi trả kết quả về giao diện.”
