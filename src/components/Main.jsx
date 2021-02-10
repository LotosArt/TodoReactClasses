import React, {Component} from 'react';
import Form from "./Main/Form";
import TasksList from "./Main/TasksList";
import Tabs from "./Main/Tabs";

class Main extends Component {
  state = {
    toDoList: [],
    inputText: '',
    activeTab: 'all',
    isEditTaskId: '',
  }

  switchTabs = (tab) => {
    if (!tab) {
      return;
    }
    this.setState({
      activeTab: tab
    })
  }

  componentDidMount() {
    fetch('https://5ffad9cb87478d0017d9a901.mockapi.io/todo')
      .then(response => response.json())
      .then(res => this.setState({
        toDoList: res
      }))
  }

  onClickTaskList = ({target}) => {
    const btnAttr = target.dataset.btn;
    if (!btnAttr) {
      return;
    }
    const taskElement = target.closest('[data-id]');
    const taskId = taskElement.dataset.id;

    switch (btnAttr) {
      case 'delete':
        this.onDeleteHandler(taskId);
        break;
      case 'completed':
        this.onCompleteHandler(taskId);
        break;
      case 'edit':
        this.onEditHandler(taskId);
        break;
      default:
        break;
    }
  }

  onDeleteHandler = (taskId) => {
    try {
      fetch(`https://5ffad9cb87478d0017d9a901.mockapi.io/todo/${taskId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(() => {
          this.setState((prevState) => {
            return {
              toDoList: prevState.toDoList.filter(task => +task.id !== +taskId)
            }
          })
        })
    } catch (e) {
      console.error(e);
    }
  }

  onCompleteHandler(taskId) {
    try {
      fetch(`https://5ffad9cb87478d0017d9a901.mockapi.io/todo/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !this.state.toDoList.find(task => task.id === taskId).completed
        })
      })
        .then(response => response.json())
        .then(res => {
          this.setState((prevState) => {
            return {
              toDoList: prevState.toDoList.map(task => {
                if (+task.id === +taskId) {
                  return {
                    ...task,
                    completed: res.completed
                  }
                }
                return task;
              })
            }
          });
        })
    } catch (e) {
      console.error(e);
    }
  }

  onEditHandler(taskId) {
    this.setState({
      isEditTaskId: taskId,
      inputText: this.state.toDoList.find(task => task.id === taskId).description,
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.state.isEditTaskId ? this.editTask(this.state.isEditTaskId, this.state.inputText) : this.createTask();
  }

  onChangeHandler = ({target: {value, name}}) => {
    this.setState({
      [name]: value
    })
  }

  onCancelHandler = () => {
    this.setState({
      isEditTaskId: ''
    })
  }

  editTask(isEditTaskId, inputText) {
    try {
      fetch(`https://5ffad9cb87478d0017d9a901.mockapi.io/todo/${isEditTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: inputText
        })
      })
        .then(response => response.json())
        .then(res => {
          this.setState((prevState) => {
            return {
              toDoList: prevState.toDoList.map(task => {
                if (+task.id === +isEditTaskId) {
                  return {
                    ...task,
                    description: res.description
                  }
                }
                return task;
              }),
              inputText: '',
              isEditTaskId: ''
            }
          });
        })
    } catch (e) {
      console.error(e);
    }
  }

  createTask() {
    try {
      fetch('https://5ffad9cb87478d0017d9a901.mockapi.io/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: this.state.inputText,
          completed: false
        })
      })
        .then(resp => resp.json())
        .then(res => {
          this.setState(prevState => {
            return {
              toDoList: [
                res,
                ...prevState.toDoList
              ],
              inputText: ''
            }
          })
        })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      toDoList,
      inputText,
      activeTab,
      isEditTaskId,
    } = this.state;
    return (
      <div className='container'>
        <Form
          inputText={inputText}
          isEditTaskId={isEditTaskId}
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
          onCancelHandler={this.onCancelHandler}
        />
        <Tabs
          switchTabs={this.switchTabs}
          activeTab={activeTab}
        />
        <TasksList
          toDoList={toDoList}
          onClickTaskList={this.onClickTaskList}
          activeTab={activeTab}
          isEditTaskId={isEditTaskId}
        />
      </div>
    )
  }
}

export default Main;