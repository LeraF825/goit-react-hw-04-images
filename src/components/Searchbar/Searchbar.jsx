import { useState } from 'react';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';

export const Searchbar =({handleSearch})=> {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
   
    if (value.trim() === '') {
      Notiflix.Report.failure('😡 Error','Please enter a value before searching.');
    } else {
      handleSearch(value);
    }
  }; 
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.buttonForm}>
            <ImSearch size="1.5rem" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }