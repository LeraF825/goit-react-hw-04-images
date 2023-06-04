import { Component } from 'react';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      Notiflix.Report.failure('😡 Error','Please enter a value before searching.');
    } else {
      this.props.handleSearch(value);
    }
  };
  render() {
    
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.buttonForm}>
            <ImSearch size="1.5rem" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
