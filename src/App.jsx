import { useState } from 'react'
import './App.css'

function App() {

  const [ notes, setNotes ] = useState([]);
  const [ selectedNote, setSelectedNote ] = useState(null);
  const [ editedText, setEditedText ] = useState("");


  const handleNoteAdd = () => {
    const newNote = {
      id: Date.now(),
      text: "新規ノート📝"
    }
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setEditedText(newNote.text);
    // console.log(notes)
  }

  const handleSelect = (note) => {
    // console.log(note)
    setSelectedNote(note)
    setEditedText(note.text);
  }

  const handleDelete = (noteId) => {
    const filteredNote = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNote);

    if(filteredNote.length > 0){
      const lastNote = filteredNote[filteredNote.length - 1]
      setSelectedNote(lastNote);
    } else {
      setSelectedNote(null);
    }
  }

  const handleChange = (e) => {
    setEditedText(e.target.value)
  }

  const handleSave = () => {
    const updatedNotes = notes.map((note) => {
      if(note.id === selectedNote.id) {
        return {...note, text: editedText}
      }
      return note;
    });
    setNotes(updatedNotes)
  }

  return (
    <div className='app-container'>
      {/* sidebar */}
      <div className='sidebar'>
        <button id='create' onClick={handleNoteAdd}>ノート追加</button>
        <ul>
          {notes.map((note, index) => (
            <li id={note.id} key={index} className={selectedNote.id === note.id ? "selected" : ""}>
              <button onClick={() => handleDelete(note.id)} className='delete'>削除</button>
              <span onClick={() => handleSelect(note)}>{note.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* main */}
      <div className='main'>
        {selectedNote ? (
          <>
            <h2>内容</h2>
            <textarea value={editedText} onChange={handleChange} />
            <button onClick={handleSave} className='save'>保存</button>
          </>
        ) : (
          <div>
            ノートを作成してください。
          </div>
        )}
      </div>
    </div>
  )
}

export default App