import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // use useEffect hook to get all thoughts to render
  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch('/api/users');
        const jsonData = await res.json();
        // use sort method to sort thoughts by newest to oldest
        const _data = jsonData.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1, );
        // once data is sorted, store data using State setter method
        setThoughts([ ..._data]);
        setIsLoaded(true);
      }catch (error){
        console.log(error);
      }
    };
    fetchData();
    // dependency array is empty meaning this fetch will be invoked once the component mounts
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} setThoughts={setThoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
