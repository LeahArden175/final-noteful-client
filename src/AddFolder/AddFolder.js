import React, { Component } from "react";
import "./AddFolder.css"

export default class AddFolder extends Component {

    render() {
        const { className } = this.props;
        return(
            
            <div>
            <h2>Create a folder</h2>
            <form className={["Noteful-form", className].join(" ")}>
            <label>Name: </label>
            <input type="text"></input>
            <button type="submit">Add Folder</button>
            </form>
            </div>
        )
    }
}