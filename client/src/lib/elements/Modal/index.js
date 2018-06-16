import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

import { Toggle } from '../../elements/Toggle';
import { Portal } from '../../helpers/Portal';
import ModalComponent from './ModalComponent';

const Y_TRANSLATE = -50;

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    closeButton: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    overlayOpacity: PropTypes.number,
    animationDuration: PropTypes.number,
  };

  static defaultProps = {
    closeButton: true,
    closeOnOverlayClick: true,
    overlayOpacity: 0,
    animationDuration: 200,
  };

  /**
   * @param {*} close: close modal with animation
   * then
   * *@props.closeModal: close the whole modal (with portal)
   */
  closeModal = close => {
    const { animationDuration } = this.props;

    //* Close the modal first (with animation)
    close();

    //* Then unmount the portal
    setTimeout(() => {
      this.props.closeModal();
    }, animationDuration);
  };

  /**
   * @param {*} on: is showing modal
   * @param {*} close: close the modal
   *
   * local controlled variable
   * so the animation is finished
   * before actually close the modal
   */
  renderModalComponent(styles, on, close) {
    const { closeButton, closeOnOverlayClick, children } = this.props;

    if (!on) {
      return null;
    }

    return (
      <ModalComponent
        {...styles}
        children={children}
        closeModal={() => this.closeModal(close)}
        closeButton={closeButton}
        closeOnOverlayClick={closeOnOverlayClick}
      />
    );
  }

  render() {
    const { isOpen, overlayOpacity, animationDuration } = this.props;

    if (!isOpen) {
      return null;
    }

    const from = { ...opacity(), yTranslate: Y_TRANSLATE };
    const enter = { ...opacity(overlayOpacity, 1), yTranslate: 0 };
    const leave = { ...opacity(), yTranslate: Y_TRANSLATE };

    return (
      <Toggle on={isOpen}>
        {({ on, close }) => (
          <Portal>
            <Transition
              native
              from={from}
              enter={enter}
              leave={leave}
              impl={TimingAnimation}
              config={{ duration: animationDuration, easing: Easing.linear }}
              children={styles => this.renderModalComponent(styles, on, close)}
            />
          </Portal>
        )}
      </Toggle>
    );
  }
}

export { Modal };

const opacity = (overlayOpacity = 0, cardOpacity = 0) => {
  return {
    overlayOpacity,
    cardOpacity,
  };
};
