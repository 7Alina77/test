import React, { useState } from 'react';
import deleteImg from '../../../public/delete.svg';
import editImg from '../../../public/edit.svg';
import { BASE_URL } from '../../../utils';
import EditSeminarModal from '../molecules/EditSeminarModal';

function Seminar ({ seminar, onDelete, onEdit  }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${seminar.id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete seminar');
      }
  
      // Убедимся, что сервер вернул успешный статус
      if (res.status === 200) {
        onDelete(seminar.id); // Удаляем из состояния после успешного удаления на сервере
      }
    } catch (error) {
      console.error(`Error deleting seminar: ${error}`);
    }
  };

  return (
    <section className='w-full my-0 mx-auto'>
      <div className='box-content text-xl m-10 p-5 shadow-md rounded-xl'>
        <div className='flex items-start justify-between'>
          <img className="rounded-xl w-15 h-15" src={seminar.photo} alt={seminar.title} />
          <div className='flex'>
            <button 
                onClick={() => setIsEditModalOpen(true)} 
                className="w-10 h-10 p-1 rounded-xl hover:bg-blue-200 hover:cursor-pointer transition"
                aria-label="Редактировать семинар">
                <img className="w-full h-full object-contain" src={editImg} alt="Редактировать семинар" />
            </button>
            <button 
              onClick={handleDelete} 
              className="w-10 h-10 p-1 rounded-xl hover:bg-red-200 hover:cursor-pointer transition"
              aria-label="Удалить семинар">
              <img 
                className="w-full h-full object-contain"
                src={deleteImg} 
                alt="Удалить семинар"
              />
            </button>
          </div>
        </div>
        <h2 className='text-2xl'>{seminar.title}</h2>
        <p>{seminar.description}</p>
        <div className='flex space-x-3'>
          <p>{seminar.date}</p>
          <p>{seminar.time}</p>
        </div>
      </div>

      {/* Модальное окно редактирования */}
      {isEditModalOpen && (
        <EditSeminarModal 
          seminar={seminar} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={onEdit}
        />
      )}
    </section>
  )
}

export default Seminar;