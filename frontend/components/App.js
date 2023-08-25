import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
        state = {
        todos: [],
        error: '',
        enterName:'',
        }
  
//initial axios get
fetchAllTodos= ()=>{
      axios.get(URL)
      .then(res =>{
        this.setState({...this.state, todos: res.data.data})
         
      })
      .catch(this.setAxiosResponseError)
    }

    //component is mounted rendering 
 componentDidMount(){
  //initializing fetchalltodos so that it displays
      this.fetchAllTodos()
  
      
    }


    //another handlers to post a new to do
    //this one controls my input box values
onInputChange  = event => {
        const { value } = event.target
            this.setState({...this.state, enterName: value})
  
            }

//this is my submitHandler
//prevents reload
//once submitted it will call postNewTodo using axios post
 submitNewTodo= event=>{
  event.preventDefault()
  this.postNewTodo()
 }

//axios post takes in the URL where we posting and what we submitting 
  postNewTodo = () => {
    axios.post(URL, {name: this.state.enterName})
    .then(res =>{
       this.fetchAllTodos()
       this.clearInputBox()
      })
      .catch( this.setAxiosResponseError)
    
    }


//this clear the enter task input box after posting 
 clearInputBox =() =>{
  this.setState({...this.state, enterName: ''})
 }
 
 //this handler displays Errors, made it so that i have dry code instead of it being repetitive, used in the .catch
 setAxiosResponseError =(err)=>{
  console.log(err)
  this.setState({...this.state, error:`Error:${err.response.data.message}` })
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
