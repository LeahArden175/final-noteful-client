import React from "react";
import "./AddNote.css";
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
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
            <input type="text" id="noteName"/>
            <label>Content</label>
            <input type="text" id="noteContent"/>
            <label>Folder</label>
            <select>
              {folders.map((folder) => (
                <option value={folder.id} id="noteFolder">{folder.name}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        )}
      </ApiContext.Consumer>
    );
  }
}