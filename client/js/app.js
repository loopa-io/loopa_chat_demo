import React from "react"
import ReactDOM from "react-dom"
import randomColor from "randomcolor"

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = { messages: [] }
  }

  componentDidMount(){
    const server = new WebSocket(`ws://localhost:3000/messages`)
    const user = localStorage.getItem("user") ||  prompt("¿Cuál es tu nombre?")
    const color = localStorage.getItem("color") ||  randomColor()

    localStorage.setItem("user", user)
    localStorage.setItem("color", color)

    server.onopen = () => {
      const message = {
        username: user,
        color: color,
        message: "Se unió a la sala."
      }
      server.send(JSON.stringify(message))
    }

    server.onmessage = e => {
      const messages = JSON.parse(e.data)
      this.setState({ messages })
      window.scrollTo(0, document.body.scrollHeight)
    }

    this.server = server
    this.user = user
    this.color = color
  }

  sendMessage(){
    const message = {
      username: this.user,
      color: this.color,
      message: this.refs.message.value
    }
    this.server.send(JSON.stringify(message))
    this.refs.message.value = ""
  }

  handleEnter(e){
    if(e.keyCode === 13){
      this.sendMessage()
    }
  }

  render(){
    return (
      <div>
        <ul>
          {this.state.messages.map((message, i) => {
            return (
              <li key={i}>
                <span style={{ color: message.color }}>{message.username} : </span>
                <span>{message.message}</span>
              </li>
            )
          })}
        </ul>
        <input autoFocus placeholder="escribe un mensaje!" type="text"
          ref="message" onKeyUp={this.handleEnter.bind(this)}></input>
      </div>
    )
  }
}

const app = document.getElementById("app")
ReactDOM.render(<Chat />, app)
