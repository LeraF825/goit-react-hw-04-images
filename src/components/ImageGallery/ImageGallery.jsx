import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { Component } from 'react';
import { getSearchImages } from 'services/api';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';


export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    searchCopy: null,
    totalResults: 0,
    error: null,
    isLoading: false,
    modalData: null,
    isModalOpen: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.search !== state.searchCopy) {
      return { page: 1, searchCopy: props.search };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.search !== this.props.search ||
      prevState.page !== this.state.page
    ) {
      this.getSeacrhImg();
    }
  }

  getSeacrhImg = () => {
    this.setState({ isLoading: true, error: null });
    getSearchImages(this.props.search, this.state.page)
      .then(imagesInfo =>{
        if (imagesInfo.totalHits === 0) {
          Notiflix.Report.info('😪 Oh, no',
            'Sorry, there are no images matching your search query. Please try again.',
          );}
        this.setState(prevState => ({
          images:
            this.state.page === 1
              ? imagesInfo.hits
              : [...prevState.images, ...imagesInfo.hits],
          totalResults: imagesInfo.totalHits,
        }))
      })
      .catch(err => this.setState({ error: err.message }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setModalData = modalData => {
    this.setState({ modalData });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleOpenModal = data => {
    this.setModalData(data);
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { images, isLoading, modalData, error, totalResults } = this.state;

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
            handleOpenModal={this.handleOpenModal}
            />
          ))}
        </ul>
        )}
        {totalResults > images.length && <Button onClick={this.changePage} />}
        {modalData && <Modal modalData={modalData} closeModal={this.closeModal} />}
      </>
    );
  }
}
