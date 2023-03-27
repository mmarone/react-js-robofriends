import React, { Component } from "react";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";

import "./App.css";

// const state = {
//   robots,
//   searchfield: "",
// };

// const App = () => {
//   return (
//     <div className="tc">
//       <h1>RoboFriends</h1>
//       <SearchBox />
//       <CardList robots={robots} />;
//     </div>
//   );
// };

class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const robots = await response.json();

    this.setState({ robots: robots });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox
          searchfield={searchfield}
          searchChange={this.onSearchChange}
        />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
