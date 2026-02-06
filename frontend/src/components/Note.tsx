import type { noteObject } from '../types';
import '../styles/note.css';

interface NoteProp {
    note: noteObject;
    onDelete: (id: number) => Promise<void>;
}

function Note({ note, onDelete }: NoteProp) {
    const date = new Date(note.created_at).toLocaleString('en-US');

    return (
        <div className="note-container">
            <p className="note-title"> {note.title}</p>
            <p className="note-content"> {note.content}</p>
            <p className="note-date">{date}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note;
