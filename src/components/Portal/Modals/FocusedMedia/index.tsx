import React from 'react';

import { ModalBG, CloseModal, CenteredContainer } from '../../../../global/styles';
import { Container } from './styles';

import type { TFocusedMedia } from '../../../Contents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  focusedMedia: TFocusedMedia;
  setFocusedMedia: (focusedMedia: TFocusedMedia | null) => void;
}

const FocusedMedia: React.FC<Props> = ({ focusedMedia: [type, src], setFocusedMedia }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <ModalBG>
      <CenteredContainer>
        <Container>
          <CloseModal onClick={() => setFocusedMedia(null)}>
            <FontAwesomeIcon size="2x" color="purple" icon={faTimes} />
          </CloseModal>
          {type === 'img' ? (
            <img src={src} alt="media" />
          ) : (
            <video controls>
              <source src={src} />
              Your browser does not support the video player!
            </video>
          )}
        </Container>
      </CenteredContainer>
    </ModalBG>
  );
};

export default FocusedMedia;
