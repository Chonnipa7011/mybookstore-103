import React, { useState } from "react";

const Calendar = () => {
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      name: "วันหยุดปีใหม่",
      date: "2024-01-01",
      type: "วันหยุด",
      color: "red"
    },
    {
      id: 2,
      name: "ประชุมประจำเดือน",
      date: "2024-01-15",
      type: "ประชุม",
      color: "blue"
    },
    {
      id: 3,
      name: "วันสงกรานต์",
      date: "2024-04-13",
      type: "วันหยุด",
      color: "red"
    },
  ]);

  // State สำหรับ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "วันหยุด"
  });

  // ฟังก์ชันลบกิจกรรม
  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบกิจกรรมนี้หรือไม่?")) {
      setHolidays(holidays.filter(holiday => holiday.id !== id));
    }
  };

  // ฟังก์ชันเปิด/ปิด Modal
  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ name: "", date: "", type: "วันหยุด" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ฟังก์ชันจัดการ Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ฟังก์ชันเพิ่มกิจกรรม
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newHoliday = {
      id: holidays.length + 1,
      name: formData.name,
      date: formData.date,
      type: formData.type,
      color: formData.type === "วันหยุด" ? "red" : "blue"
    };

    setHolidays([...holidays, newHoliday]);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              ปฏิทินบริษัท
            </h1>
            <button 
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              เพิ่มกิจกรรม
            </button>
          </div>

          {/* Holiday Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidays.map((holiday) => (
              <div
                key={holiday.id}
                className={`rounded-lg p-6 shadow-sm border ${
                  holiday.color === "red"
                    ? "bg-red-50 border-red-100"
                    : "bg-blue-50 border-blue-100"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {holiday.name}
                  </h3>
                  <button 
                    onClick={() => handleDelete(holiday.id)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    ลบ
                  </button>
                </div>
                
                <p className="text-gray-700 mb-3">
                  📅 {holiday.date}
                </p>
                
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    holiday.color === "red"
                      ? "bg-red-200 text-red-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {holiday.type}
                </span>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {holidays.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">ยังไม่มีกิจกรรมในปฏิทิน</p>
              <p className="text-gray-400 text-sm mt-2">คลิก "เพิ่มกิจกรรม" เพื่อเริ่มต้น</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal เพิ่มกิจกรรม */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                เพิ่มกิจกรรมใหม่
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* ชื่อกิจกรรม */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  ชื่อกิจกรรม
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="กรอกชื่อกิจกรรม"
                  required
                />
              </div>

              {/* วันที่ */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  วันที่
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* ประเภท */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  ประเภท
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="วันหยุด">วันหยุด</option>
                  <option value="ประชุม">ประชุม</option>
                </select>
              </div>

              {/* ปุ่ม Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                เพิ่มกิจกรรม
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;