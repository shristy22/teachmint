import React, { useState, useEffect, useMemo } from 'react';

const Clock = ({ selectedCountry }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isPaused, setIsPaused] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

   useEffect(() => {
      const fetchTimezoneData = () => {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
          .then(response => response.json())
          .then(data => {
            setCurrentTime(new Date(data.datetime))
          })
          .catch(error => console.error('Error fetching current time:', error));
      };
      if (selectedCountry && !isPaused) {
        fetchTimezoneData();
      }    
    }, [selectedCountry]);
  
    useEffect(() => {
        if(isPaused){
           clearInterval(intervalId);
         }
        else if(selectedCountry && !isPaused){
           const id = setInterval(() => {
           setCurrentTime((prevTime) => {
            const newTime = new Date(prevTime.getTime() + 1000); // Increment by 1 second
            return newTime;
           });
           }, 1000);
          setIntervalId(id);
        }
    },[selectedCountry,isPaused])
  
    const togglePause = () => {
      setIsPaused(!isPaused);
    };
  
    const formatTime = useMemo(() => {
      return time =>
        time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
          timeZone: selectedCountry
        });
    }, [selectedCountry]); 
   
    return (
      <div className='d-flex'>
        <div className='timer-format'>{selectedCountry ? formatTime(currentTime) : '00: 00: 00'}</div>    
        <button onClick={togglePause}>Pause/Start</button>
      </div>
    );
  };
  export default Clock;