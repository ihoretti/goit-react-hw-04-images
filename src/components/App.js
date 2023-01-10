import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonLoadMore } from './ButtonLoadMore/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../service/api';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { images, totalPages } = await getImages(inputValue, page);

        if (images.length === 0) {
          throw new Error('Not a valid word');
        }

        setStatus('resolved');
        setTotalPages(totalPages);
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        setStatus('rejected');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue, page]);

  const handleSubmit = inputValue => {
    if (inputValue === '') {
      toast('Write something', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  const onClickLoadMoreBtn = () => {
    setPage(page => page + 1);
  };

  const onClickCard = modalData => {
    setSelectedItem(modalData);
    toggle();
  };

  const toggle = () => {
    setVisible(prevState => !prevState);
  };

  // const { largeImageURL, tags } = selectedItem;

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'resolved' && (
        <ImageGallery imgData={images} onClickCard={onClickCard} />
      )}
      {status === 'idle' && (
        <p
          style={{
            color: 'rgb(4, 120, 128)',
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          Write something
        </p>
      )}
      {status === 'rejected' && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          {error?.message}! Try again!
        </p>
      )}
      {loading && <Loader />}
      {images.length > 0 && totalPages !== page && !loading && (
        <ButtonLoadMore disabled={loading} onClickBtn={onClickLoadMoreBtn} />
      )}
      {visible && <Modal modalData={selectedItem} toggle={toggle} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
