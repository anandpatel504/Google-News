import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
  state = {
    List: []
  };

  componentWillMount() {
    // axios.get("http://localhost:3031/news").then(data => {
    //   this.setState({ List: data.data });
    //   console.log("hello Anand");
    //   console.log(data);
    // });

    const loadfunc = async () => {
        const res = await fetch("http://newsapi.org/v2/top-headlines?pageSize=10&country=in&category=Business&apiKey=9ced313f2eca4419aa010004b2bdfb1d");
        const totalNews = await res.json();
        this.setState({List: totalNews.articles});
        console.log("done")
        console.log(totalNews.articles);
    }
    loadfunc();

    // this.fetchUsers();
  }
  render() {
    return (
      <div>
        {this.state.List.map((item, index) => {
          return (
            <a href={item.url}>
              <div className="container">
                <div className="wrapper">
                  <img src={item.urlToImage} alt="bad internet connectivity" />
                </div>
                <div class="Title">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                  <p className="author">{item.author}</p>
                </div>
              </div>
            </a> 
          );
        })}
      </div>
    );
  }
}

export default Home;
