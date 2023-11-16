import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PeopleDirectory = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([])


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(user => {
        setUsers(user)
        const fetchPostData = user.map(user => 
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then(response => response.json())
        );

        Promise.all(fetchPostData).then(details => {
          setPosts(details)
        })
        .catch(error => console.error('Error fetching user posts:', error))
      })
      .catch(error => console.error('Error fetching user details:', error))
  }, []);

  return (
    <div className='dir-layout'>
      <h2> Directory</h2>
      {users.length > 0 ? 
        users.map((user,index) => {
          return(
          <Link to={`/users/${user.id}`} key={user.id} className='people-dir'>
            <div>Name: {user.name}</div>
              {posts[index] && 
                <div>Posts: {posts[index].length}</div>
              }
          </Link>
        )})
        :
        <h2>Loading user details..</h2>
      }

    </div>
  );
};

export default PeopleDirectory;
