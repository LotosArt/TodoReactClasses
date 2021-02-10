import React, {Component} from 'react';

class Form extends Component {
  render() {
    const {
      inputText,
      isEditTaskId,
      onChangeHandler,
      onSubmitHandler,
      onCancelHandler
    } = this.props;

    const btnName = isEditTaskId ? 'Save' : 'Add task';
    const btnAttr = isEditTaskId ? 'save-task' : 'add-task';

    return (
      <form
        className='form'
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          value={inputText}
          onChange={onChangeHandler}
          name='inputText'
        />
        <button
          className={btnAttr}
        >
          {btnName}
        </button>
        {isEditTaskId && <button onClick={onCancelHandler}>Cancel</button>}
      </form>
    )
  }
}

export default Form;