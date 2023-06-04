import s from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {

  handleBackdropClick = e => {
    if (e.target !== e.currentTarget) return;
    this.props.closeModal();
  };
  handleCloseByEsc = (e) => {
    if (e.code !== "Escape") return;
    this.props.closeModal();
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseByEsc);
  }

  render(){
    const {url} = this.props.modalData;
    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img 
          src={url} 
          alt="" />
        </div>
      </div>
    );
  }
  
};
