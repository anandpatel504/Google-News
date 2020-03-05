import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
  state = {
    List: [],
    Main_List: [],
    number: 0
  };


nextpage = () =>{
  var second_20 = this.state.List.slice(this.state.number, this.state.number + 20)
  this.setState({Main_List: second_20, number: this.state.number + 20})
}

previouspage = () => {
  console.log(this.state.number-40, this.state.number)
  var previous_20 = this.state.List.slice(this.state.number - 40, this.state.number - 20)
  this.setState({Main_List: previous_20, number: this.state.number - 20})
}

  componentDidMount() {
    // axios.get("http://localhost:3031/news").then(data => {
    //   this.setState({ List: data.data });
    //   console.log("hello Anand");
    //   console.log(data);
    // });

    axios
    .get("https://newsapi.org/v2/top-headlines?pageSize=100&country=in&category=Business&apiKey=9ced313f2eca4419aa010004b2bdfb1d")
    .then((data) => {
      var first_20 = (data.data.articles.slice(0, 20))
      console.log(first_20)
      this.setState({ List: data.data.articles, Main_List: first_20, number: 20 });
    })
    .catch(err => console.log(err))

    // this.fetchUsers();
  }
  render() {
    var previous;
    var nextpage;
    if (this.state.number == 20) {
      previous = ""
      nextpage = <button className="btn btn-info" onClick={this.nextpage}>next page</button>
    }else if(this.state.number == 80){
      previous = <button className="btn btn-warning" onClick={this.previouspage}>previous page</button>
      nextpage = ""
    }else{
      nextpage = <button className="btn btn-info" onClick={this.nextpage}>next page</button>
      previous = <button className="btn btn-warning" onClick={this.previouspage}>previous page</button>
    }

    return (
      <div className="container">
        {this.state.Main_List.map((item, index) => {
          return (
            <a href={item.url}>
              <div className="container2">
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
        <div className="button">
          {previous}
          {nextpage}
        </div>
      </div>
    );
  }
}

export default Home;
