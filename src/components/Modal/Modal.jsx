import s from './Modal.module.css';
import {  useEffect } from 'react';

export const Modal =({closeModal, modalData})=> {

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  };
 const handleCloseByEsc = (e) => {
    if (e.code !== "Escape") return;
    closeModal();
  };

  useEffect(()=>{
    window.addEventListener("keydown", handleCloseByEsc);
  }) 

  useEffect(()=>{
    window.removeEventListener("keydown", handleCloseByEsc);
  }) 

    const {url} = modalData;
    return (
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img 
          src={url} 
          alt="" />
        </div>
      </div>
    );
  }
  
