import React, {Component} from 'react';
import Task from "./TaskList/Task";

class TasksList extends Component {

  filterMap = (task) => {
    return <Task
      key={task.id}
      task={task}
      isEditTaskId={this.props.isEditTaskId}
    />
  }

  render() {
    const {
      toDoList,
      onClickTaskList,
      activeTab,
    } = this.props;

    return (
      <ul
        onClick={onClickTaskList}
        className='tasks-list'
      >
        {
          activeTab === 'all' && toDoList.map(this.filterMap)
        }
        {
          activeTab === 'done' && toDoList.filter(task => task.completed).map(this.filterMap)
        }
        {
          activeTab === 'undone' && toDoList.filter(task => !task.completed).map(this.filterMap)
        }
      </ul>
    )
  }
}

export default TasksList;