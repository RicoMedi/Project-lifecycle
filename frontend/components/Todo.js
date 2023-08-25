import React from 'react'

export default class Todo extends React.Component {
  render() {
    return(
      <div id='todos'>
      <h1>Todos:</h1>
    {
      this.state.todos.reduce((acc, td) => {
        if(this.state.displayCompleted || !td.completed) return acc.concat(
          <div onClick={this.toggleComplete(td.id)} key={td.id}>{td.name} {td.completed ? '🗹' : ''  }</div>
        )
        return acc
      }, [])
      
    }
    </div>
    )
  }
}
