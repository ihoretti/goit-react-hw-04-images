import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonLoadMore } from './ButtonLoadMore/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../service/api';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    selectedItem: [],

    loading: false,
    status: 'idle',
    error: null,
    visible: false,
    totalPages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, page } = this.state;

    if (prevState.inputValue !== inputValue || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: null });
        const { images, totalPages } = await getImages(inputValue, page);

        if (images.length === 0) {
          throw new Error('Not a valid word');
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          loading: false,
          status: 'resolved',
          totalPages,
        }));
      } catch (error) {
        this.setState({
          status: 'rejected',
          loading: false,
          error,
        });
        console.log(error);
      }
    }
  }

  handleSubmit = inputValue => {
    if (inputValue === '') {
      toast('Write something', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    this.setState({
      inputValue,
      loading: false,
      images: [],
      page: 1,
    });
  };
  onClickLoadMoreBtn = event => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickCard = id => {
    const { images } = this.state;

    const item = images.find(img => img.id === id);
    console.log(item);

    this.setState({
      selectedItem: item,
    });
    this.toggle();
  };

  toggle = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    const {
      images,
      loading,
      page,
      totalPages,
      selectedItem,
      visible,
      status,
      error,
    } = this.state;
    const { largeImageURL, tags } = selectedItem;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'resolved' && (
          <ImageGallery imgData={images} onClickCard={this.onClickCard} />
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
            onClickBtn={this.onClickLoadMoreBtn}
          />
        )}
        {visible && (
          <Modal url={largeImageURL} tags={tags} toggle={this.toggle} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
