import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFileWord,
  faFilePowerpoint,
  faFileExcel,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import { Medias } from '../../global/types';

interface Props {
  item: {
    media: Medias;
  };
}

const Contents: React.FC<Props> = ({ item }) => {
  const getIcon = (docName: string) => {
    if (docName.match('.pdf')) return faFilePdf;
    else if (docName.match('.docx') || docName.match('dot')) return faFileWord;
    else if (docName.match('.pptx')) return faFilePowerpoint;
    else if (docName.match('.xlsx') || docName.match('.xlsm')) return faFileExcel;
    else return faFile;
  };

  return (
    <>
      {item.media.images && item.media.images.length ? (
        <ul className="mediaList images">
          {item.media.images.map((img, i) => (
            <li key={`img${i}`}>
              <img src={img} alt={`img${i}`} />
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
      {item.media.videos && item.media.videos.length ? (
        <video controls>
          <source src={item.media.videos[0]} />
          Your browser doesn't support the video player!
        </video>
      ) : (
        ''
      )}
      {item.media.docs && item.media.docs.length ? (
        <ul className="mediaList docs">
          {item.media.docs.map((img, i) => (
            <li key={`doc${i}`}>
              <a download href={img.url} className="docView">
                <FontAwesomeIcon icon={getIcon(img.name)} size="4x" />
                {img.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
      {item.media.audios && item.media.audios.length ? (
        <audio controls>
          <source src={item.media.audios[0]} />
          Your browser doesn't support the audio player!
        </audio>
      ) : (
        ''
      )}
    </>
  );
};

export default Contents;
