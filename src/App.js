import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/posts', { title, content });
      alert('Post created!');
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Failed to create post');
      console.error(err);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Insecure Blogger</h1>
      <button>Create Post</button>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button type="submit">Submit Post</button>
        <button type="button" style={{ marginLeft: '1rem' }}>
          Cancel
        </button>
      </form>
      <h2>Posts:</h2>
      {posts && posts?.map((post, i) => {
        return (
          <div key={post.id}>
            <h3 dangerouslySetInnerHTML={{ __html:post.title}}/>
            <p dangerouslySetInnerHTML={{ __html:post.content}}/>
          </div>
        );
      })}
    </div>
  );
}

export default App;

