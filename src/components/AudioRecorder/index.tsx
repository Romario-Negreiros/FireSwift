import React from 'react';

import { toast } from 'react-toastify';
import setMessage from '../../utils/setters/setMessage';

import { Container, Progress, Options } from './styles';
import { InnerCenteredContainer } from '../../global/styles';
import { Loader } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faPlay,
  faStop,
  faGripLinesVertical,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

import { Chat, User } from '../../global/types';

interface Props {
  setShowAudioRecorder: (showAudioRecorder: boolean) => void;
  chat: Chat;
  user: User;
  text: string;
  setValue: (value: string) => void;
}

const AudioRecorder: React.FC<Props> = ({ setShowAudioRecorder, chat, user, text, setValue }) => {
  const [timer, setTimer] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
console.log(setTimer);
  const start = () => {
    if (mediaRecorder?.state === 'inactive') {
      mediaRecorder?.start(1000);

      mediaRecorder?.addEventListener('dataavailable', event => {
        setAudioChunks([...audioChunks, event.data]);
      });

      setIsRecording(true);
    }
  };

  const pause = () => {
    if (mediaRecorder?.state === 'recording') {
      mediaRecorder?.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (mediaRecorder?.state === 'paused') {
      mediaRecorder?.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (mediaRecorder?.state !== 'inactive') {
      mediaRecorder?.stop();
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      setMessage(chat, user, text, setValue, undefined, audioBlob, setShowAudioRecorder);
      setIsRecording(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
      } catch (err) {
        if (err instanceof Error)
          toast.error('You must allow the microphone access to record an audio!');
        setShowAudioRecorder(false);
      }
    })();
  }, [setShowAudioRecorder]);

  if (!mediaRecorder) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Loader />
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      <Progress>
        <div className="progress">
          <div className="invisible">
            <div className="progress-bar"></div>
          </div>
        </div>
        <div className="timer">
          <span>0:{timer < 10 ? '0' + timer : timer}</span>
        </div>
      </Progress>
      <Options>
        <div
          onClick={() => {
            isRecording ? stop() : start();
          }}
        >
          <FontAwesomeIcon icon={isRecording ? faStop : faPlay} size="2x" color="purple" />
        </div>
        {isRecording && (
          <div
            onClick={() => {
              isPaused ? resume() : pause();
            }}
          >
            <FontAwesomeIcon
              icon={isPaused ? faGripLinesVertical : faPause}
              size="2x"
              color="purple"
            />
          </div>
        )}
        <div onClick={() => setShowAudioRecorder(false)}>
          <FontAwesomeIcon icon={faTimes} size="2x" color="red" />
        </div>
      </Options>
    </Container>
  );
};

export default AudioRecorder;
