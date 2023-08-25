import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
        state = {
        todos: [],
        error: '',
        enterName:'',
        displayCompleted: true,
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
      //the concat will only make one network response
       this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
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

 toggleComplete = id => ()=> {
  axios.patch(`${URL}/${id}`)
      .then(res=>{
        this.setState({...this.state, todos: this.state.todos.map(td =>{
            if(td.id !== id) return td
            return res.data.data
        })
       })
      })
      .catch(this.setAxiosResponseError)
    }

  clearButton = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  render() {
    
    return (
      
     <div>
        <div id="error"> {this.state.error} </div> 
          
         <TodoList
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleComplete={this.toggleComplete}
         />
         
        <Form  
          submitNewTodo  = {this.submitNewTodo}
          onInputChange = {this.onInputChange}
          clearButton = {this.clearButton}
          enterName = {this.state.enterName}
          displayCompleted = {this.state.displayCompleted}
        />
     
     </div>
    )
  }
 }
