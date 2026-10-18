require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  mark: Number,
}));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/students", async (_req, res) => {
  res.json(await Student.find());
});

app.post("/api/students", async (req, res) => {
  res.status(201).json(await Student.create(req.body));
});

app.patch("/api/students/:id", async (req, res) => {
  res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/api/students/:id", async (req, res) => {
  res.json(await Student.findByIdAndDelete(req.params.id));
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  const port = process.env.PORT || 3006;
  app.listen(port, () => console.log(`API chạy ở port ${port}`));
});
