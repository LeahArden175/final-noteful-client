import React from "react";
import "./AddNote.css";
import ApiContext from '../ApiContext';
import ValidationError from '../ValildationError';
import ErrorBoundary from '../ErrorBoundary';
import PropTypes from 'prop-types';

export default class AddNote extends React.Component {
static contextType = ApiContext

  state = {
    title: {
      value: " ",
      touched: false
    }
  }



  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { noteTitle, noteContent} = e.target.elements
    const newNote = {
      title: noteTitle.value,
      content: noteContent.value,
      folder_id: document.getElementById("folderTitleSelect").value,
      date_modified: (new Date()).toISOString(),
    }

    console.log("DATE", newNote.date_modified, new Date())

    this.setState({ error: null })
    fetch('http://localhost:9090/api/notes', {
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
        noteTitle.value = ''
        noteContent.value = ''
        this.context.addNote(data)
      })
      .catch(error => {
        this.setState({ error })
      })

      this.props.history.push('/');
  }

  updateTitle(title) {
    this.setState({
      title: {
        value:title,
        touched: true
      }
    });
  }


    validateTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "Title is required"
  }
}
  


  render() {
    const nameError = this.validateTitle();
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
            <label>Title</label>
            <input required name="noteTitle" type="text" id="noteTitle" onChange={e => this.updateTitle(e.target.value)}/>
            {this.state.title.touched && <ValidationError message={nameError} />}
            <label>Content</label>
            <input required name="noteContent" type="text" id="noteContent"/>
            <label>Folder</label>
            <select required id="folderTitleSelect">
              {folders.map((folder) => (
                <option name="noteFolder" value={folder.id} id="noteFolder">{folder.title}</option>
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
    title: PropTypes.string.isRequired,
    date_modified:PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}