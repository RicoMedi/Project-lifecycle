import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return(
      <div>
       <form id="todoForm" onSubmit={this.props.submitNewTodo}>
          <input 
          value={this.props.enterName} 
          type='text' onChange={this.props.onInputChange}  
          placeholder='Enter task'>

          </input>
          <input type='submit' ></input>  
        </form>
        <button onClick={this.props.clearButton}> {this.props.displayCompleted ? 'Hide' : 'Show'} Tasks </button>

      </div>
    )
  }
}
