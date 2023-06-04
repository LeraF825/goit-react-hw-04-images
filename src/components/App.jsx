import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import s from './App.module.css';
import { useState, useEffect } from "react";

export const App =()=> {
  const [search, setSearch] = useState('');

const handleSearch = (value)=>{
setSearch(value)
}

useEffect(()=>{
  setSearch('')
},[])
    return (
      <div className={s.container}>
        <Searchbar handleSearch={handleSearch}/>
        <ImageGallery search={search}/>
      </div>
    );
  }
