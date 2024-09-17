import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import NoteCard from './NoteCard';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [pinned, setPinned] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err) {
      setError('Error fetching notes');
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:5000/notes',
        { title, content, hashtags, pinned },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      resetForm();
      setShowAddForm(false);
      fetchNotes();
    } catch (err) {
      setError('Error adding note');
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://127.0.0.1:5000/notes/${editingNote.id}`,
        { title, content, hashtags, pinned },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      resetForm();
      setEditingNote(null);
      setShowAddForm(false);
      fetchNotes();
    } catch (err) {
      setError('Error updating note');
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setHashtags(note.hashtags || '');
    setPinned(note.pinned);
    setEditingNote(note);
    setShowAddForm(true);
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:5000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      setError('Error deleting note');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setHashtags('');
    setPinned(false);
    setError('');
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.hashtags && note.hashtags.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={styles.navbar}>
        <h1 style={styles.navbarTitle}>Notes</h1>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.container}>
        {showAddForm && (
          <div style={styles.formContainer}>
            <h3>{editingNote ? 'Edit Note' : 'Add Note'}</h3>
            <form onSubmit={editingNote ? updateNote : addNote} style={styles.form}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={styles.textarea}
              ></textarea>
              <input
                type="text"
                placeholder="Hashtags (comma separated)"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                style={styles.input}
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                />
                Pin Note
              </label>
              <button type="submit" style={styles.submitButton}>
                {editingNote ? 'Update Note' : 'Add Note'}
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.notesContainer}>
          {filteredNotes.length === 0 ? (
            <p style={styles.noNotesMssage}>No notes found</p>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={editNote}
                onDelete={deleteNote}
              />
            ))
          )}
        </div>

        <button
          style={styles.addButton}
          onClick={() => {
            setEditingNote(null);
            resetForm();
            setShowAddForm(true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 0px',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarTitle: {
    margin: 0,
    marginLeft: '20px',
  },
  searchInput: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    margin: '0 20px',
    width: '200px',
  },
  container: {
    marginTop: '60px',
    padding: '20px',
    position: 'relative',
  },
  formContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    resize: 'vertical',
  },
  checkboxLabel: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  notesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '50px',
    justifyContent: 'flex-start',
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    padding: '10px 0px',
    borderRadius: '25px',
    width: '80px',
    height: '80px',
    fontSize: '3em',
    cursor: 'pointer',
    zIndex: 1000,
  },
  error: {
    color: 'red',
  },
  
  noNotesMssage: {
    textAlign: 'center',
    color: '#888',
    width: '100%',
    fontSize: '2em',
    fontStyle: 'italic',
  },
};

export default Notes;
