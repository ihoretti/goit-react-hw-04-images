import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonLoadMore } from './ButtonLoadMore/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../service/api';

import 'react-toastify/dist/ReactToastify.css';

export const App =()=> {
  
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedItem,setSelectedItem] = useState([]);

  const [loading,setLoading] = useState(false);
  const [status,setStatus] = useState('idle');
  const [error,setError] = useState(null);
  const [visible,setVisible] = useState(false);
  const [totalPages,setTotalPages] = useState(0);
  };

useEffect(() => {
  //async componentDidUpdate(_, prevState) {
  //const { inputValue, page } = this.state;

  if (inputValue !== `` || page !== 1) {
    return;
  }
  const fetchData = async () => {
    setLoading(true)
      setError(null)
    
    try {
      //this.setState({ loading: true, error: null });
      
      const { images, totalPages } = await getImages(inputValue, page);
    
      if (images.length === 0) {
        throw new Error('Not a valid word');
      }

      const setImages = (images) => ([]) => {
           
        setLoading(false)
        setStatus('resolved')
        setTotalPages(totalPages)
      };
       {
        //this.setState({
        setStatus('rejected');
        setLoading(false);
        setError(error),
      
          console.log(error);
      }
    }
  

  catch handleSubmit = inputValue => {
      if (inputValue === '') 
        toast('Write something', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      };

      //this.setState({
      setInputValue(inputValue);
      setLoading(false);
      setImages([]);
      setPage(1);
    }
  
     const onClickLoadMoreBtn = event => {
     setPage (page => 
         page + 1
      )
    }

    const onClickCard = id => {
      // const { images } = this.state;

      const item = images.find(img => img.id === id);
      console.log(item);

      setSelectedItem(item);
      toggle();
    };

    const toggle = () => {
      setVisible(prevState => 
         !prevState.visible
      );
    };

    // render() {
    // const {
    // images,
    // loading,
    // page,
    // totalPages,
    //selectedItem,
    //visible,
    //status,
    // error,
    // } = this.state;
    const { largeImageURL, tags } = selectedItem;

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
          <ButtonLoadMore
            disabled={loading}
            onClickBtn={onClickLoadMoreBtn}
          />
        )}
        {visible && (
          <Modal url={largeImageURL} tags={tags} toggle={toggle} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  })
