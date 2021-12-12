import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faLaugh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../../../global/types';

interface Props {
  reactions: Post['reactions'];
  handleClick: (reaction?: string) => void;
}

const Reactions: React.FC<Props> = ({ reactions, handleClick }) => {
  const handleRender = (reaction: string): Post['reactions'] => {
    const filteredReactions: Post['reactions'] = [];
    reactions.forEach(reactionObj => {
      if (reactionObj.reaction === reaction) {
        filteredReactions.push(reactionObj);
      }
    });
    return filteredReactions;
  };

  return (
    <>
      <li onClick={() => handleClick('like')}>
        <div>
          <FontAwesomeIcon color="blue" size="2x" icon={faThumbsUp} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('like');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('heart')}>
        <div>
          <FontAwesomeIcon color="red" size="2x" icon={faHeart} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('heart');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('smile')}>
        <div>
          <FontAwesomeIcon color="yellow" size="2x" icon={faLaugh} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('smile');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('cry')}>
        <div>
          <FontAwesomeIcon color="yellow" size="2x" icon={faSadCry} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('cry');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
      <li onClick={() => handleClick('angry')}>
        <div>
          <FontAwesomeIcon color="red" size="2x" icon={faAngry} />
        </div>
        <div>
          <span>
            {(() => {
              const totalCorrespondingReactions = handleRender('angry');
              return totalCorrespondingReactions.length;
            })()}
          </span>
        </div>
      </li>
    </>
  );
};

export default Reactions;
