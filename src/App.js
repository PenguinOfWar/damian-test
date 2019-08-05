import React, { Component } from 'react';
import request from 'superagent';
import './App.scss';
import PostList from './components/PostList';
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    }
  }

  componentDidMount() {
    request.get('https://www.reddit.com/hot.json')
      .end((error, response) => {
        if (error) {
          this.setState({
            error: true
          });
        }

        const { body = {} } = response;
        const { data = {} } = body;
        const { children = [] } = data;

        this.setState({
          isLoaded: true,
          items: children,
        })
      });
  }

  render() {

    var { isLoaded, items } = this.state;

    console.log(items);

    if (!isLoaded) {
      return (
        <div>This has not loaded.</div>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <div className="top-bar">Amazing Logo Goes Here</div>
              <ul>
                {items.map(item => (
                  <li key={item.kind}>
                    <strong>Author:</strong> {item.data.author} | <strong>Link:</strong>   {item.data.permalink}
                  </li>
                ))}
              </ul>
            <PostList />
          </header>
        </div>
      );
    }
  }
}

export default App;
