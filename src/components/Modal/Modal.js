import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalBody, Img } from './Modal.styled';

export const Modal = ({ modalData, toggle }) => {
  const { url, tags } = modalData;
  useEffect(() => {
    const handeleKeyDown = e => {
      if (e.code === 'Escape') {
        toggle();
      }
    };

    window.addEventListener('keydown', handeleKeyDown);
    return () => {
      window.removeEventListener('keydown', handeleKeyDown);
    };
  }, [toggle]);

  const onClickOverlay = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  return (
    <Overlay name="overlay" onClick={onClickOverlay}>
      <ModalBody>
        <Img src={url} alt={tags} />
      </ModalBody>
    </Overlay>
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
};
