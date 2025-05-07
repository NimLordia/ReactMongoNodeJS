import { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api/notes';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchNotes = () => {
    getNotes()
      .then(res => setNotes(res.data))
      .catch(console.error);
  };

  const handleCreate = () => {
    if (!content) return;
    createNote({ title, content }).then(() => {
      setTitle('');
      setContent('');
      fetchNotes();
    });
  };

  const handleEditClick = (note) => {
    setEditingNote(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = () => {
    if (!editContent) return;
    updateNote(editingNote, { title: editTitle, content: editContent }).then(() => {
      setEditingNote(null);
      setEditTitle('');
      setEditContent('');
      fetchNotes();
    });
  };

  const handleDelete = (id) => {
    deleteNote(id).then(fetchNotes).catch(console.error);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h2>Notes App</h2>
      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleCreate}>Add Note</button>
      </div>

      <ul className="note-list">
        {notes.map(note => (
          <li key={note._id} className="note">
            {editingNote === note._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit content"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingNote(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => handleEditClick(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
