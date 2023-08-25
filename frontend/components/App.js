import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
        state = {
        todos: [],
        error: '',
        enterName:'',
        }
  
 
fetchAllTodos= ()=>{
      axios.get(URL)
      .then(res =>{
        this.setState({...this.state, todos: res.data.data})
              
      })
      .catch(err => {
       this.setState({...this.state, error: `Error: ${err.response.data.message}`})
        
      })
    }
 componentDidMount(){
      this.fetchAllTodos()
  
      
    }
//another Helper to post a new to do
    onInputChange  = event => {
        const { value } = event.target
            this.setState({...this.state, enterName: value})
  
            }

//axios post takes in the URL where we posting and what we submitting
 postNewTodo = () => {
  axios.post(URL, {name: this.state.enterName})
  .then(res =>{
    this.fetchAllTodos()
    this.setState({...this.state, enterName: ''})
  })
  .catch(err=>{
    this.setState({...this.state, error: err.response.data.message})
  })
 }

//this is my submitHandler
//prevents reload
//once submitted it will call postNewTodo using axios post
 submitNewTodo= event=>{
  event.preventDefault()
  this.postNewTodo()
 }


  render() {
    
    return (
      <div>
        
        <div id="error"> {this.state.error} </div> 
          <div id='todos'>
          <h1>Todos:</h1>
        {
          this.state.todos.map(td=>{
            return <div key={td.id}>{td.name}</div>
          })
        } 
        </div>
        <form id="todoForm" onSubmit={this.submitNewTodo}>
          <input value={this.state.enterName} type='text' onChange={this.onInputChange}  placeholder='Enter task'></input>
          <input type='submit' onSubmit={this.doSubmit}></input>
          <button> Clear Tasks </button>
      </form>
      </div>
     
    )
  }
}
