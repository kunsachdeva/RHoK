import React, { Component } from 'react';
import './App.css';

var map=null;
var marker=null;
var color=100;
var id=0;

var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
      apiKey: "AIzaSyCOmubrc3gEd6LOW5UfRH5LVaL-GFgRCgk",
      databaseURL: "https://not-so-awesome-project-45a2e.firebaseio.com",
}, 'myApp');
var base = Rebase.createClass(app.database());
class App extends Component {
  constructor(props){
    super(props);
    this.state={stat:'empty'}
  }
  componentDidMount(){
    
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 28.4880432, lng: 77.0622027},
      zoom: 15
    });
    marker = new window.google.maps.Marker({
      position: {lat: 28.4880432, lng: 77.0622027},
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 9,
        strokeColor: '#393'
      },
      map: map
    });
    new window.google.maps.Marker({
      position: {lat: 28.4922299, lng: 77.0406163},
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 9,
        strokeColor: '#393'
      },
      map: map
    });
    new window.google.maps.Marker({
      position: {lat: 28.4976471, lng: 77.0699711},
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 9,
        strokeColor: '#ffaa00'
      },
      map: map
    });
    new window.google.maps.Marker({
      position: {lat: 28.4883309, lng: 77.0787258},
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 9,
        strokeColor: '#f21a1a'
      },
      map: map
    });
    base.listenTo(`stats`, {
      context: this,
      state: 'stat',
      then(s){
        clearTimeout(id)
        if(Object.keys(s).length>0){
        var stat=s[Object.keys(s)[0]].status;
        console.log(stat)
        this.setState({stat})
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 9,
          strokeColor: (stat=='empty')?'#339933':'#ffaa00'
        })
        id=setTimeout(function(){
          marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 9,
            strokeColor: (stat=='empty')?'#339933':'#f21a1a'
          })
        },2000)
         
    }
  }
});
  }
  render() {
    return (
      <div className="App">
        <div id="map" style={{height:'700px'}}>
          
        </div>
      </div>
    );
  }
}

export default App;
