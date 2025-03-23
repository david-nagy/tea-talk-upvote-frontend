import React, { useState } from 'react';

interface Post {
  id: string;
  title: string;
  votes: number;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleAddPost = () => {
    if (!newPostTitle.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle.trim(),
      votes: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
  };

  const handleVote = (id: string, delta: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, votes: p.votes + delta } : p));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tea Talk</h1>
      <div>
        <input
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="New topic"
        />
        <button onClick={handleAddPost}>Add</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} — Votes: {post.votes}
            <button onClick={() => handleVote(post.id, 1)}>▲</button>
            <button onClick={() => handleVote(post.id, -1)}>▼</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;