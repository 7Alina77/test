import React, { useState } from 'react';
import { BASE_URL } from '../../../utils';

function EditSeminarModal({ seminar, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: seminar.title,
    description: seminar.description,
    date: seminar.date,
    time: seminar.time,
    photo: seminar.photo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      // Разрешаем только цифры и точки
      if (/^[0-9.]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!seminar.id) {
      console.error("Ошибка: отсутствует ID семинара");
      return;
    }
  
    try {
      const res = await fetch(`${BASE_URL}/${seminar.id}`, {
        method: "PATCH", // Используем PATCH для частичного обновления
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw new Error(`Ошибка при редактировании: ${res.status}`);
      }
  
      const updatedSeminar = await res.json();
      onSave(updatedSeminar); // Обновляем состояние в родительском компоненте
      onClose();
    } catch (error) {
      console.error(`Ошибка редактирования: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Редактировать семинар</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Название"
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Описание"
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="ДД.ММ.ГГГГ"
            maxLength="10"
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="URL изображения"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSeminarModal;