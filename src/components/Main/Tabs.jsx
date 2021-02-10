import React, {Component} from 'react';

class Tabs extends Component {
  onClickTabsHandler = ({target}) => {
    this.props.switchTabs(target.dataset.tab);
  }

  render() {
    const {activeTab} = this.props;
    return (
      <ul onClick={this.onClickTabsHandler}>
        <button data-tab='all' className={`tab ${activeTab === 'all' ? 'active-tab' : ''}`}>All</button>
        <button data-tab='done' className={`tab ${activeTab === 'done' ? 'active-tab' : ''}`}>Done</button>
        <button data-tab='undone' className={`tab ${activeTab === 'undone' ? 'active-tab' : ''}`}>Undone</button>
      </ul>
    )
  }
}

export default Tabs;