import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
   <div>
        <div id='todos'>
            <h1>Todos:</h1>
            {
              this.props.todos.reduce((acc, td) => {
              if(this.props.displayCompleted || !td.completed) return acc.concat(
              <div onClick={this.props.toggleComplete(td.id)} key={td.id}>{td.name} {td.completed ? '🗹' : ''  }</div>
            )
               return acc
            }, [])
      
            }
      </div>
      
  </div>
    )
  }
}
