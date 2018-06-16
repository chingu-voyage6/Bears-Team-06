import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';

import { elevation, position } from 'config/theme';

import { Color } from '../../utilities';
import { Icon } from '../Icon';

const propTypes = {
  cardOpacity: PropTypes.object.isRequired,
  overlayOpacity: PropTypes.object.isRequired,
  yTranslate: PropTypes.object.isRequired,
  closeButton: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  closeOnOverlayClick: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const ModalComponent = ({
  cardOpacity,
  overlayOpacity,
  yTranslate,
  children,
  closeModal,
  closeButton,
  closeOnOverlayClick,
}) => (
  <ModalWrapper>
    <ModalCard
      style={{
        opacity: cardOpacity,
        transform: yTranslate.interpolate(
          yTranslate => `translate3d(0, ${yTranslate}px, 0)`,
        ),
      }}
    >
      {closeButton && (
        <CloseButton onClick={closeModal}>
          <Icon name="close" width={16} height={16} />
        </CloseButton>
      )}
      {children}
    </ModalCard>
    <Background
      onClick={() => (closeOnOverlayClick ? closeModal() : {})}
      style={{
        opacity: overlayOpacity,
      }}
    />
  </ModalWrapper>
);

ModalComponent.propTypes = propTypes;

export default ModalComponent;

const ModalWrapper = styled.div`
  ${position('absolute')} width: 100%;
  height: 100%;
  ${position('centerChildren')};
`;

const ModalCard = styled(animated.div)`
  position: relative;
  background: ${new Color('background').get()};
  border-radius: 2px;
  box-shadow: ${elevation(4)};
  padding: 2rem;
  min-width: 400px;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Background = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
`;
