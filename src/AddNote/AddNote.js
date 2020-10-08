import React from "react";
import "./AddNote.css";
import ApiContext from '../ApiContext';
import ValidationError from '../ValildationError';
import ErrorBoundary from '../ErrorBoundary';
import PropTypes from 'prop-types';

export default class AddNote extends React.Component {
static contextType = ApiContext

  state = {
    name: {
      value: " ",
      touched: false
    }
  }



  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { noteName, noteContent} = e.target.elements
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

      this.props.history.push('/');
  }

  updateName(name) {
    this.setState({
      name: {
        value:name,
        touched: true
      }
    });
  }


    validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required"
  }
}
  


  render() {
    const nameError = this.validateName();
    const { className } = this.props;
    return (
      <ApiContext.Consumer>
        {({ folders }) => (
          <ErrorBoundary>
          <form
            onSubmit={this.handleSubmit}
            className={["Noteful-form", className].join(" ")}
            action="#"
          >
            <label>Name</label>
            <input required name="noteName" type="text" id="noteName" onChange={e => this.updateName(e.target.value)}/>
            {this.state.name.touched && <ValidationError message={nameError} />}
            <label>Content</label>
            <input required name="noteContent" type="text" id="noteContent"/>
            <label>Folder</label>
            <select required id="folderNameSelect">
              {folders.map((folder) => (
                <option name="noteFolder" value={folder.id} id="noteFolder">{folder.name}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
          </ErrorBoundary>
        )}
      </ApiContext.Consumer>
    );
  }
}

AddNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape ({
    name: PropTypes.string.isRequired,
    modified:PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}