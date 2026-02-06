import { useEffect, useState } from 'react';
import api from '../api';
import type { AxiosResponse } from 'axios';
import Note from '../components/Note';
import type { noteObject } from '../types';

import '../styles/home.css';

function Home() {
    const [notes, setNotes] = useState<noteObject[]>([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    //on load
    useEffect(() => {
        getNotes();
    }, []);

    //get and delete notes
    const getNotes = () => {
        api
            .get('/api/notes/')
            .then((res: AxiosResponse) => {
                console.log('res.data :', res.data);
                return res.data;
            })
            .then((data) => setNotes(data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id: number) => {
        api
            .delete(`/api/notes/delete/${id}`)
            .then((res) => {
                if (res.status === 204) {
                    alert('note deleted');
                } else {
                    alert('failed to delete note');
                }
            })
            .catch((err) => alert(err));
    };

    const createNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //debug
        // console.log('Creating note...');
        // console.log('Token in localStorage:', localStorage.getItem(ACCESS_TOKEN));
        // console.log('Title:', title);
        // console.log('Content:', content);

        api
            .post('/api/notes/', { content, title })
            .then((res) => {
                console.log('Response:', res);
                if (res.status === 201) {
                    console.log('Note created');
                } else {
                    console.error('Failed to create note');
                }
                getNotes();
            })
            .catch((err) => {
                console.error('❌ Error:', err);
            });
    };

    return (
        <div>
            <div>
                <h1> Notes</h1>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2> Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label htmlFor="content">Content:</label>
                <br />

                <textarea
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <button className="create-button" type="submit" value="submit">
                    Create
                </button>
            </form>
        </div>
    );
}

export default Home;
