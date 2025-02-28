import React, { useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import { BASE_URL } from '../../../utils';
import SeminarList from '../molecules/SeminarList';

function App() {
  const [seminarsData, setSeminarsData] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  const getApiData = async () => {
    setIsLoaderActive(true);
    try {
      const res = await fetch(BASE_URL);
      if(!res.ok) {
        throw new Error('Error on loading the seminars data');
      }
      const data = await res.json();
      setSeminarsData(data);
    } catch (error) {
      console.log(`Error on loading the main data of seminars: ${error}`);
    } finally {
      setIsLoaderActive(false);
    }
  }

  useEffect (() => {
    getApiData();
  },[]);

  const handleDeleteSeminar = (id) => {
    setSeminarsData((prev) => prev.filter((seminar) => seminar.id !== id));
  };

  const handleEdit = (updatedSeminar) => {
    setSeminarsData((prev) => prev.map((s) => (s.id === updatedSeminar.id ? updatedSeminar : s)));
  };

  console.log(seminarsData);

  return (
    <>
    {isLoaderActive ? 
    (
      <Loader></Loader>
    ) : 
    <main>
      <h1 className="text-3xl font-bold text-center m-10">
        Seminars:
      </h1>
      <SeminarList
        seminarsData = {seminarsData}
        onDelete= {handleDeleteSeminar}
        onEdit= {handleEdit}
      ></SeminarList>
    </main>
    }
    </>
  )
}

export default App;
