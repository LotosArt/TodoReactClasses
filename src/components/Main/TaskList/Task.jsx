import React, {Component} from 'react';

class Task extends Component {

  render() {
    const {
      id,
      description,
      completed
    } = this.props.task;

    const {
      isEditTaskId
    } = this.props;

    const btnName = completed ? 'Uncompleted' : 'Completed';
    const classComplete = completed ? 'completed' : 'uncompleted';

    return (
      <li
        data-id={id}
        className={isEditTaskId === id ? 'edit-tab' : classComplete}
      >
        <p>{description}</p>
        <button data-btn='delete'>Delete</button>
        <button data-btn='completed'>{btnName}</button>
        <button data-btn='edit'>Edit</button>
      </li>
    )
  }
}

export default Task;
