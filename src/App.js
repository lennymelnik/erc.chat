import React, { Component } from 'react'
import { findAllInRenderedTree } from 'react-dom/test-utils'
import Web3 from 'web3'
import './App.css'
import { MESSAGES_ABI, MESSAGES_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()


   
  }
  

  async loadBlockchainData() {
    const web3 = new Web3("http://192.168.0.238:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const messageList = new web3.eth.Contract(MESSAGES_ABI, MESSAGES_ADDRESS)
    this.setState({ messageList })
    console.log("HELLO", messageList.methods)
    const messageCount = await messageList.methods.messageCount().call()
    const chatCount = await messageList.methods.getChatLength(this.state.chatHash).call()
    console.log("Chat length", chatCount)
    this.setState({ chatCount })

    this.setState({ messageCount })
    if(this.state.chatHash != ''){
      
      var hashCode = [this.state.user,this.state.targetUser]
      hashCode.sort()
      hashCode = hashCode[0] + hashCode[1]
      console.log(hashCode)

      //hashCode.sort()
      console.log("Chat hash", hashCode)
      const messages = await messageList.methods.getMessages(hashCode).call()
      console.log('Messages', messages)

      this.setState({ messages })
      console.log("messages", messages)
      console.log("messageCount ", messageCount)
    }
    //setTimeout(function(e){ console.log("E",e) /*this.loadBlockchainData()*/ }, 3000);

    

  }
 
 
 async addOne() {
  var hashCode = [this.state.user,this.state.targetUser]
  hashCode.sort()
  hashCode = hashCode[0] + hashCode[1]
    this.state.messageList.methods.createMessage(this.state.user, this.state.targetUser,this.state.toSend, hashCode).send({from: this.state.account, gas:3000000}).once('receipt', async (receipt) => {
      this.loadBlockchainData()
      alert("Message sent")
      document.getElementById('message').value = ''
      
      console.log(receipt)
      
    })
    console.log("sent")
}
  constructor(props) {
    super(props)
    this.state = { account: '' , messageList : undefined, messages : {0: []}, toSend : "", user : '', targetUser : '', chatHash : ''}
  }

  render() {
    return (
      <div className="container">
        <h1 >Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <a> Send from<input onChange={(e)=>{this.setState({user : e.target.value, chatHash : this.state.user +this.state.targetUser})}}></input></a>
        <a> Send to<input onChange={(e)=>{this.setState({targetUser : e.target.value, chatHash : this.state.user +this.state.targetUser})}}></input></a>

        <p>Total chats: {this.state.messageCount}</p>
        <p>Your chats: {this.state.chatCount}</p>

        {this.state.messages[0].map((message, index)=> (<p>{message}: {this.state.messages[2][index]}</p>))}

        <input id="message" onChange={(e)=>{this.setState({toSend : e.target.value})}}/>
        <a onClick={this.addOne.bind(this)}>Send Message</a>
        <br/>
        <a onClick={this.loadBlockchainData.bind(this)}>Refresh</a>

       
      </div>
    );
  }
}

export default App;