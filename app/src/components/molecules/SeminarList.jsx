import React from 'react';
import Seminar from '../atoms/Seminar';

function SeminarList ( {seminarsData, onDelete, onEdit } ) {
  return (
    <section>
      {seminarsData.map((seminar) => {
        return (
        <Seminar 
          key= {seminar.id}
          seminar = {seminar}
          onDelete= {onDelete}
          onEdit = {onEdit}
        >
        </Seminar>
        )
      })}
    </section>
  )
}

export default SeminarList;