import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import s from './App.module.css';
import { Component } from "react";

export class App extends Component {
  state={
   search:'',
  }
handleSearch = (search)=>{
this.setState({search})
}

  render(){
    const {search}= this.state;
    return (
      <div className={s.container}>
        <Searchbar handleSearch={this.handleSearch}/>
        <ImageGallery search={search}/>
      </div>
    );
  }
};
