# Demo students API

Đây là project gốc dùng **students** như bản trên GitHub. Client giữ React Bootstrap CRUD sinh viên đơn giản và có vùng xem HTTP status/JSON để chạy tình huống live coding.

## Chạy project

Cần Node.js và MongoDB local đang chạy.

```powershell
cd Deliverables/Phan-3-Kien-Demo
npm install
Copy-Item backend/.env.example backend/.env
Copy-Item client/.env.example client/.env
```

Mở hai terminal trong thư mục project:

```powershell
npm run dev --workspace backend
```

```powershell
npm run dev --workspace client
```

Client chạy tại `http://localhost:5173`; backend chạy tại `http://localhost:3006`. MongoDB dùng database `sdn302_demo`.

## Scenario API

Các request dùng prefix `http://localhost:3006/api`:

1. `GET /students` — lấy danh sách.
2. `GET /students/:id` — xem một sinh viên. Lấy `_id` từ bước 1 hoặc 3.
3. `POST /students` — tạo sinh viên, trả `201`. Body ví dụ: `{"name":"An","mark":8}`. Có thể truyền `_id` nếu muốn demo kiểm tra ID trùng.
4. `POST /students` với `{}` — dữ liệu thiếu, trả `400`. POST có `_id` trùng trả `409`.
5. `GET /students/sai-id` — ID sai định dạng, trả `400`.
6. `GET /students/64b000000000000000000099` — ID hợp lệ nhưng không tồn tại, trả `404`.
7. `PATCH /students/:id` — sửa một phần, ví dụ `{"mark":9}`.
8. `PUT /students/:id` — gửi đủ dữ liệu thay sinh viên: `{"name":"An mới","mark":9}`.
9. `DELETE /students/:id` — xóa sinh viên.

Mọi endpoint trả cùng hợp đồng JSON: `{ "success": true|false, "data": ..., "message": "..." }`. Lỗi dùng `success:false`, `data:null` và status phù hợp (`400`, `404`, `409`).

Client vẫn là form/bảng Bootstrap cơ bản. Nút **GET theo ID** cho phép thử ID sai, ID không tồn tại hoặc ID hợp lệ; **POST thiếu dữ liệu** gọi API với body rỗng. Status và JSON response (kể cả lỗi) hiện ngay trên màn hình. Các request có thể gọi thêm bằng Postman/REST Client.

## Backend và `listen`

Backend định nghĩa model `Student`, các route `/api/students`, rồi kết nối MongoDB. Sau khi kết nối thành công mới gọi `server.listen(PORT, HOST, ...)` để Express nhận request.

## Template thực hành

Các template độc lập nằm ngoài project ở [Phan-3-Kien-Demo-Template](../Phan-3-Kien-Demo-Template/README.md). Bản React/Express/MongoDB dùng cùng bài toán students; hai template HTTP và Express cơ bản vẫn là các project riêng.
