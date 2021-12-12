import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../../../global/types';

interface Props {
  post: Post;
}

const Contents: React.FC<Props> = ({ post }) => {
  const getIcon = (docName: string) => {
    if (docName.match('.pdf')) return faFilePdf;
    else if (docName.match('.docx') || docName.match('dot')) return faFileWord;
    else if (docName.match('.pptx')) return faFilePowerpoint;
    else if (docName.match('.xlsx') || docName.match('.xlsm')) return faFileExcel;
    else return faFile;
  };

  return (
    <>
      {post.media.images.length && (
        <ul className="mediaList">
          {post.media.images.map((img, i) => (
            <li key={`img${i}`}>
              <img src={img} alt={`img${i}`} />
            </li>
          ))}
        </ul>
      )}
      {post.media.videos.length && (
        <video controls>
          <source src={post.media.videos[0]} />
          Your browser doesn't support the video player!
        </video>
      )}
      {post.media.docs.length && (
        <ul className="mediaList">
          {post.media.docs.map((img, i) => (
            <li key={`doc${i}`}>
              <a download href={img.url} className="docView">
                <FontAwesomeIcon icon={getIcon(img.name)} size="4x" />
                {img.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Contents;
