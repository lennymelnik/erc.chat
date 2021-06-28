import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { MESSAGES_ABI, MESSAGES_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  

  async loadBlockchainData() {
    const web3 = new Web3("http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const messageList = new web3.eth.Contract(MESSAGES_ABI, MESSAGES_ADDRESS)
    this.setState({ messageList })
    console.log("HELLO", messageList.methods)
    const messageCount = await messageList.methods.messageCount().call()
    const messages = await messageList.methods.getMessages().call()
    console.log(messages)
    var newMessages = []
    for(var i =0;i<messages[0].length;i++){
      console.log(messages[0][i])
      //newMessages.push({sentFrom: messages[0][i], sentTo : messages[1][i], content : messages[3][i], id : messages[4][i]})

    }

    this.setState({ messageCount })
    this.setState({ messages })
  
    console.log("messages", messages)
    console.log("messageCount ", messageCount)

  }
  async updateData() {
    const taskCount = await this.todoList.methods.getCounter().call()
    console.log("updating data")
    this.setState({ taskCount :  taskCount})
    console.log("taskCount ", taskCount)

  }
  async updateMessage(sendValue) {

    this.setState({ toSend :  sendValue})
    console.log("newText ", this.state.toSend)

  }
 async addOne() {
 
    this.state.messageList.methods.createMessage("user1","user2",this.state.toSend).send({from: this.state.account, gas:3000000}).once('receipt', async (receipt) => {
      this.loadBlockchainData()
      console.log(receipt)
      
    })
    console.log("sent")
}
  constructor(props) {
    super(props)
    this.state = { account: '' , messageList : undefined, messages : {0: []}, toSend : ""}
  }

  render() {
    return (
      <div className="container">
        <h1 >Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <p>Amount: {this.state.messageCount}</p>
        <a onClick={this.addOne.bind(this)}>Click Here</a>
        {this.state.messages[0].map((message, index)=> (<p>{message}: {this.state.messages[1][index]}</p>))}

        <input onChange={(e)=>{this.setState({toSend : e.target.value})}}></input>
       
      </div>
    );
  }
}

export default App;