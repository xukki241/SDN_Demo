import React from "react";
import { useEffect, useState } from "react";
import { addStudent, deleteStudent, getStudents, updateStudent } from "./api.js";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [mark, setMark] = useState("");
  const [editingId, setEditingId] = useState("");

  async function loadStudents() {
    const response = await getStudents();
    setStudents(response.data);
  }

  useEffect(() => { loadStudents(); }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const student = { name, mark: Number(mark) };

    if (editingId) {
      await updateStudent(editingId, student);
    } else {
      await addStudent(student);
    }

    setName("");
    setMark("");
    setEditingId("");
    loadStudents();
  }

  function editStudent(student) {
    setEditingId(student._id);
    setName(student.name);
    setMark(student.mark);
  }

  async function removeStudent(id) {
    await deleteStudent(id);
    loadStudents();
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Quản lý sinh viên</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Tên sinh viên</label>
          <input className="form-control" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Điểm</label>
          <input className="form-control" type="number" value={mark} onChange={(event) => setMark(event.target.value)} required />
        </div>

        <button className="btn btn-primary" type="submit">{editingId ? "Lưu" : "Thêm sinh viên"}</button>
        {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={() => {
          setEditingId(""); setName(""); setMark("");
        }}>Hủy</button>}
      </form>

      <table className="table table-striped table-bordered table-hover">
        <thead><tr><th>Tên</th><th>Điểm</th><th>Thao tác</th></tr></thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.mark}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => editStudent(student)}>Sửa</button>{" "}
                <button className="btn btn-sm btn-danger" onClick={() => removeStudent(student._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
