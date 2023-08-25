import React from 'react'

export default class Todo extends React.Component {
  render() {
    return(
    <div id='todos'>
        <div  onClick={this.props.toggleComplete(this.props.todo.id)} >
              {this.props.todo.name}{this.props.todo.completed ? '🗹' : ''  }
        </div>
    </div>
    )
  }
}
