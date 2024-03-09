import { useState, useEffect } from 'react';

const useShoesData = () => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/shoes');
        if (!response.ok) {
          throw new Error('Failed to fetch shoes data');
        }
        const data = await response.json();
        setShoes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShoes();
  }, []);

  return { shoes, isLoading, error };
};

export default useShoesData;
