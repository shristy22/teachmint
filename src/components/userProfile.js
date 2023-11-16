import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Clock from './clock';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // Fetch user data from API
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch posts for the user from API
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching user posts:', error));

       // Fetch countries from the API
      fetch('http://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, [userId]);


  const handleCountryChange = event => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className='user-profile-layout'>
    <div className='top-user'>
        <Link to="/" className='back-btn'>Back</Link>
        <div className='timer-right'>
            <label htmlFor="country">Country:</label>
            <select id="country" value={selectedCountry} onChange={handleCountryChange} className='drop-down'>
                <option value="">Select</option>
                {countries.map(country => (
                <option key={country} value={country}>
                    {country}
                </option>
                ))}
            </select>   
            <Clock selectedCountry={selectedCountry} />
        </div>
    </div>
      <div className='center'>Profile Page</div>
      <div className='profile-page'>
        <div>
            <div>Name: {user.name} </div>
            <div>Username | Catch phrase: {user.username} | {user.company?.catchPhrase}</div>
        </div>
        <div>
            <div>Address: {user.address?.city}</div>
            <div>Email | Phone: {user.email} | {user.phone} </div>
        </div>
      </div>
      <div className='posts-container'>
        {posts.map((val) => (
          <div key={val.id} className='post'>
          <b>{val.title}</b>
          <div className='mt-30'>{val.body}</div>
        </div>
        ))}
        </div>
    </div>
  );
};

export default UserProfile;
