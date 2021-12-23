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
        <ul className="mediaList">
          {item.media.images.map((img, i) => (
            <li key={`img${i}`}>
              <img src={img} alt={`img${i}`} />
            </li>
          ))}
        </ul>
      ) : ''}
      {item.media.videos && item.media.videos.length ? (
        <video controls>
          <source src={item.media.videos[0]} />
          Your browser doesn't support the video player!
        </video>
      ) : ''}
      {item.media.docs && item.media.docs.length ? (
        <ul className="mediaList">
          {item.media.docs.map((img, i) => (
            <li key={`doc${i}`}>
              <a download href={img.url} className="docView">
                <FontAwesomeIcon icon={getIcon(img.name)} size="4x" />
                {img.name}
              </a>
            </li>
          ))}
        </ul>
      ) : ''}
      {item.media.audios && item.media.audios.length ? (
        <audio controls>
          <source src="gs://fireswift-26692.appspot.com/chats/ef11a981-65f1-4b21-bd6a-36eb82e99105/04d687f9-6acc-41a0-b5bd-025826eb7d12/audios/0" />
          Your browser doesn't support the audio player!
        </audio>
      ): ''}
    </>
  );
};

export default Contents;
