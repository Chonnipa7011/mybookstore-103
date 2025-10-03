import React, { useState } from "react";

const ContractForm = ({ employees, contract, onSave, onCancel }) => {
  const [form, setForm] = useState(
    contract || {
      employeeId: "",
      employeeName: "",
      type: "",
      startDate: "",
      endDate: "",
      salary: "",
      status: "active",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = employees.find((emp) => emp.id === parseInt(form.employeeId));
    onSave({ ...form, employeeName: employee?.name || form.employeeName, salary: parseInt(form.salary) });
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {contract ? "แก้ไขสัญญา" : "สร้างสัญญาใหม่"}
        </h2>
        <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          กลับ
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!contract && (
            <div>
              <label className="block text-sm mb-2">เลือกพนักงาน</label>
              <select
                value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                required
                className="w-full border rounded p-2"
              >
                <option value="">เลือกพนักงาน</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">ประเภทสัญญา</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
              className="w-full border rounded p-2"
            >
              <option value="">เลือกประเภท</option>
              <option value="สัญญาจ้างประจำ">สัญญาจ้างประจำ</option>
              <option value="สัญญาจ้างชั่วคราว">สัญญาจ้างชั่วคราว</option>
              <option value="สัญญาจ้างโครงการ">สัญญาจ้างโครงการ</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">วันที่เริ่มต้น</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm mb-2">วันที่สิ้นสุด</label>
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required className="w-full border rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">เงินเดือน</label>
            <input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required className="w-full border rounded p-2" />
          </div>

          {contract && (
            <div>
              <label className="block text-sm mb-2">สถานะ</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border rounded p-2">
                <option value="active">ใช้งาน</option>
                <option value="expired">หมดอายุ</option>
                <option value="terminated">ยกเลิก</option>
              </select>
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            {contract ? "บันทึกการแก้ไข" : "สร้างสัญญา"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;
