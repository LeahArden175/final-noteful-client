import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./AddFolder.css";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary";

export default class AddFolder extends Component {
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    // get the form fields from the event
    const { folderTitle } = e.target.elements;
    const newFolder = {
      title: folderTitle.value,
    };

    this.setState({ error: null });
    fetch("http://localhost:9090/api/folders", {
      method: "POST",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then((error) => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        folderTitle.value = "";
        this.context.addFolder(data);
      })
      .catch((error) => {
        this.setState({ error });
      });

    this.props.history.push("/");
  };

  render() {
    const { className } = this.props;
    return (
      <ErrorBoundary>
        <div>
          <h2>Create a folder</h2>
          <form
            className={["Noteful-form", className].join(" ")}
            onSubmit={this.handleSubmit}
          >
            <label>Title: </label>
            <input type="text" name="folderTitle" required/>
            <button type="submit">Add Folder</button>
          </form>
        </div>
      </ErrorBoundary>
    );
  }
}

AddFolder.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
};
