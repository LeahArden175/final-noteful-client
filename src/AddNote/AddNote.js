import React from "react";
import "./AddNote.css";
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component {
static contextType = ApiContext
  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { noteName, noteContent, noteFolder} = e.target.elements
    const newNote = {
      name: noteName.value,
      content: noteContent.value,
      folderId: document.getElementById("folderNameSelect").value,
      modified: Date.now(),
    }

    console.log(newNote)
    this.setState({ error: null })
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        noteName.value = ''
        noteContent.value = ''
        this.context.addNote(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }
/*
  fetch(`${config.API_ENDPOINT}/notes/${noteId}` {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      // allow parent to perform extra behaviour
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error })
    })
}
*/
    //using values from the state, call addNote on the context, add on change listeners and add a function to detect when those fields are changing, properties to add are three inputs in the return statement

  render() {
    const { className } = this.props;
    return (
      <ApiContext.Consumer>
        {({ folders }) => (
          <form
            onSubmit={this.handleSubmit}
            className={["Noteful-form", className].join(" ")}
            action="#"
          >
            <label>Name</label>
            <input name="noteName" type="text" id="noteName"/>
            <label>Content</label>
            <input name="noteContent" type="text" id="noteContent"/>
            <label>Folder</label>
            <select id="folderNameSelect">
              {folders.map((folder) => (
                <option name="noteFolder" value={folder.id} id="noteFolder">{folder.name}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}