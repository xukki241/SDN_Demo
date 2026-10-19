require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const Student = mongoose.model("Student", new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mark: { type: Number, required: true, min: 0 },
}));

function success(res, status, data, message) {
  res.status(status).json({ success: true, data, message });
}

function failure(res, status, message) {
  res.status(status).json({ success: false, data: null, message });
}

server.get("/api/health", (req, res) => {
  success(res, 200, { status: "ok" }, "API đang hoạt động");
});

server.get("/api/students", async (req, res) => {
  const students = await Student.find();
  success(res, 200, students, "Lấy danh sách sinh viên thành công");
});

server.get("/api/students/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return failure(res, 400, "ID không đúng định dạng");
  }
  const student = await Student.findById(req.params.id);
  if (!student) return failure(res, 404, "Không tìm thấy sinh viên");
  success(res, 200, student, "Lấy thông tin sinh viên thành công");
});

server.post("/api/students", async (req, res) => {
  const body = req.body || {};
  const { name, mark } = body;
  if (!name || mark === undefined || mark === "") {
    return failure(res, 400, "Cần có name và mark");
  }
  if (typeof name !== "string" || !name.trim() || typeof mark !== "number" || mark < 0) {
    return failure(res, 400, "name hoặc mark không hợp lệ");
  }
  if (body._id) {
    if (!mongoose.isValidObjectId(body._id)) {
      return failure(res, 400, "ID không đúng định dạng");
    }
    if (await Student.findById(body._id)) {
      return failure(res, 409, "ID sinh viên đã tồn tại");
    }
  }

  const student = await Student.create({ _id: body._id, name, mark });
  success(res, 201, student, "Tạo sinh viên thành công");
});

server.patch("/api/students/:id", async (req, res) => {
  const body = req.body || {};
  if (!mongoose.isValidObjectId(req.params.id)) {
    return failure(res, 400, "ID không đúng định dạng");
  }
  if (body.mark !== undefined && (typeof body.mark !== "number" || body.mark < 0)) {
    return failure(res, 400, "mark không hợp lệ");
  }

  const student = await Student.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!student) return failure(res, 404, "Không tìm thấy sinh viên");
  success(res, 200, student, "Cập nhật một phần sinh viên thành công");
});

server.put("/api/students/:id", async (req, res) => {
  const body = req.body || {};
  if (!mongoose.isValidObjectId(req.params.id)) {
    return failure(res, 400, "ID không đúng định dạng");
  }
  const { name, mark } = body;
  if (!name || mark === undefined || mark === "") {
    return failure(res, 400, "PUT cần có name và mark");
  }
  if (typeof name !== "string" || !name.trim() || typeof mark !== "number" || mark < 0) {
    return failure(res, 400, "name hoặc mark không hợp lệ");
  }

  const student = await Student.findById(req.params.id);
  if (!student) return failure(res, 404, "Không tìm thấy sinh viên");
  student.name = name;
  student.mark = mark;
  await student.save();
  success(res, 200, student, "Thay toàn bộ sinh viên thành công");
});

server.delete("/api/students/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return failure(res, 400, "ID không đúng định dạng");
  }
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return failure(res, 404, "Không tìm thấy sinh viên");
  success(res, 200, student, "Xóa sinh viên thành công");
});

server.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.code === 11000 ? 409 : error.status || 500;
  failure(res, status, error.message || "Có lỗi xảy ra");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3006;
  server.listen(port, host, () => console.log(`API chạy tại http://${host}:${port}`));
}).catch((error) => console.log("Không kết nối được MongoDB:", error.message));
