import React, { useState } from 'react';

class ScheduleModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editedObject: {
        title: '',
        initial_date: '',
        initial_time: '',
        end_date: '',
        end_time: '',
        description: ''
      }
    };
  }

  handleEditButtonClick = () => {
    this.setState({
      showModal: true,
      editedObject: { ...this.props.object }
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      editedObject: {
        title: '',
        initial_date: '',
        initial_time: '',
        end_date: '',
        end_time: '',
        description: ''
      }
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editedObject: {
        ...prevState.editedObject,
        [name]: value
      }
    }));
  };

  handleSaveButtonClick = () => {
    this.props.onSave(this.state.editedObject);
    this.handleModalClose();
  };

  render() {
    const { showModal, editedObject } = this.state;
    const { title, initial_date, initial_time, end_date, end_time, description } =
      this.props.object;

    return (
      <div>
        <p>Title: {title}</p>
        <p>Initial Date: {initial_date}</p>
        <p>Initial Time: {initial_time}</p>
        <p>End Date: {end_date}</p>
        <p>End Time: {end_time}</p>
        <p>Description: {description}</p>
        <button onClick={this.handleEditButtonClick}>Edit</button>
        {showModal && (
          <div>
            <input
              type="text"
              name="title"
              value={editedObject.title}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="initial_date"
              value={editedObject.initial_date}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="initial_time"
              value={editedObject.initial_time}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="end_date"
              value={editedObject.end_date}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="end_time"
              value={editedObject.end_time}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="description"
              value={editedObject.description}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleSaveButtonClick}>Save</button>
            <button onClick={this.handleModalClose}>Cancel</button>
          </div>
        )}
      </div>
    );
  }
}

export default ScheduleModule;
