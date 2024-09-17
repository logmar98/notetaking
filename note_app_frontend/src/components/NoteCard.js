import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  const getDefaultText = (text) => (text.trim() === '' ? 'No content' : text);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{getDefaultText(note.title)}</h3>
      <p style={styles.content}>{getDefaultText(note.content)}</p>
      {note.hashtags && (
        <p style={styles.hashtags}>{note.hashtags}</p>
      )}
      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.editButton }}
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          style={{ ...styles.button, ...styles.deleteButton }}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flexGrow: 1,
    flexBasis: 'calc(33% - 20px)', // Adjust width based on the number of columns
  },
  title: {
    margin: '0',
    wordBreak: 'break-word',
    fontSize: '1.2em',
  },
  content: {
    margin: '0',
    wordBreak: 'break-word',
    fontSize: '1em',
  },
  hashtags: {
    margin: '0',
    wordBreak: 'break-word',
    color: '#007BFF',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: 'auto',
  },
  button: {
    border: 'none',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    transition: 'background-color 0.3s ease',
  },
};

export default NoteCard;
