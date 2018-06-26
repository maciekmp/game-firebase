import React from 'react';
import firebase from 'firebase';

class Firebase extends React.Component {
  componentDidMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBJOE6fyJsBzxy-w8lc277r0leumz9-obY",
      authDomain: "game-21998.firebaseapp.com",
      databaseURL: "https://game-21998.firebaseio.com",
      projectId: "game-21998",
      storageBucket: "game-21998.appspot.com",
      messagingSenderId: "871571076877"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var userId = user.uid;
        this.setState({
          userId,
        }, this.onReady);
      } else {
        // User is signed out.
        // ...
        // debugger;
      }
      // ...
    });
    firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      debugger;
    });
    var users = firebase.database().ref('users/');
    users.on('value', (snapshot) => {
      this.props.onReady({
        users: snapshot.val(),
      });
    });
  }
  onReady() {
    firebase.database()
      .ref('/users')
      .once('value')
      .then((snapshot) => {
        this.props.onReady({
          userId: this.state.userId,
          users: snapshot.val()
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user &&
      this.props.user) {
      // update do firebase
      firebase.database()
        .ref('users/' + this.state.userId)
        .set(this.props.user);
    }
  }
  render() {
    return null;
  }
}
export default Firebase;