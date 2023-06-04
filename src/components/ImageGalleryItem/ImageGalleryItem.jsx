import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({image, handleOpenModal}) => {
  const {id, webformatURL, largeImageURL}= image
  return (
    <li 
    key={id}
    className={s.galleryItem}
    onClick={()=>handleOpenModal({url:largeImageURL})}
    >
      <img 
      className={s.galleryImage}
      src= {webformatURL} 
      alt="" />
    </li>
  );
};
