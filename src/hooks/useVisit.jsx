import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useVisit = identifier => {
  const { name } = useParams();

  const [visit, setVisit] = useState(() =>
    window.localStorage.getItem(`${name}${identifier}`)
  );
  const [counter, setCounter] = useState(0);

  const visited = useCallback(() => {
    if (!visit) window.localStorage.setItem(`${name}${identifier}`, counter);
    setCounter(counter + 1);
  }, [setVisit]);

  useEffect(() => {
    visited();
  }, [counter]);

  return {
    visit,
    visited,
  };
};

export default useVisit;
