import { useState, useEffect } from 'react';

export const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://randomuser.me/api/?results=300');
      const { results, error } = await response.json();
      if (error) {
        throw new Error(error);
      }
      setData(results);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};
