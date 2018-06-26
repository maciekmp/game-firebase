import React, { Component } from 'react';
import './App.css';
import Player from './Player';
import Firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      users: null,
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      // e.preventDefault();
      if (!this.state.users) return;

      const user = this.state.users[this.state.userId];
      if (e.which === 39 &&
        user.left < window.innerWidth - 80) {

        const users = this.state.users;
        users[this.state.userId].left = users[this.state.userId].left + 80;
        users[this.state.userId].direction = 'right';
        this.setState({
          users,
        });
      }
      if (e.which === 37 &&
        user.left > 40) {

        const users = this.state.users;
        users[this.state.userId].left = users[this.state.userId].left - 80;
        users[this.state.userId].direction = 'left';
        this.setState({
          users: users,
        });
      }
    })
  }
  render() {
    return (
      <div className="app">

        <input
          type="text"
          placeholder="type your message"
          onChange={(e) => {
            const users = this.state.users;
            users[this.state.userId].label = e.target.value;
            this.setState({
              users,
            });
          }}
        />
        <Firebase
          user={this.state.userId && this.state.users && this.state.users[this.state.userId] ?
            this.state.users[this.state.userId] : {
              left: 40,
              direction: 'right',
            }}
          onReady={(state) => {
            this.setState(state);
          }}
        />
        {this.state.users && Object.keys(this.state.users).map((userId) => {
          const user = this.state.users[userId];
          return (
            <Player
              key={userId}
              left={user.left}
              direction={user.direction}
              user={user}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
