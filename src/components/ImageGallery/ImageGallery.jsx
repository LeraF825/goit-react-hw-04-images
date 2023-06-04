import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { useState, useEffect } from 'react';
import { getSearchImages } from 'services/api';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';


export const ImageGallery =({search})=> {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchCopy, setSearchCopy] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);


  useEffect(()=>{
    if (search !== searchCopy) {
      setPage(1);
      setSearchCopy(search);
    }
  },[search,searchCopy]) 

 useEffect(()=>{
  const getSeacrhImg = () => {
    setIsLoading(true);
    setError(null);
    getSearchImages(search, page)
      .then(imagesInfo =>{
        if (imagesInfo.totalHits === 0) {
          Notiflix.Report.info('😪 Oh, no',
            'Sorry, there are no images matching your search query. Please try again.',
          );}
        setImages(prevImages =>{
          if(page === 1){
            return imagesInfo.hits
          } else{
            return [...prevImages, ...imagesInfo.hits]
          } 
      });
      setTotalResults(imagesInfo.totalHits);
    })
      .catch(err => setError( err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };
  if(search){
    getSeacrhImg()
  }
 },[search,page]);
 

  const changePage = () => {
   setPage(prevPage => (prevPage + 1));
  };

  

  const handleOpenModal = data => {
    setModalData(data);
  };

  const closeModal = () => {
   setModalData(null)
  };

    return (
      <>
      {isLoading && <Loader />}
        {error ? (
          <h1>{error}</h1>
        ): (
          <ul className={s.gallery}>
          {images.map(image => (
            <ImageGalleryItem 
            image={image} 
            key={image.id} 
            handleOpenModal={handleOpenModal}
            />
          ))}
        </ul>
        )}
        {totalResults > images.length && <Button onClick={changePage} />}
        {modalData && <Modal modalData={modalData} closeModal={closeModal} />}
      </>
    );
  }
