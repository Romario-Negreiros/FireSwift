import React from 'react';

import { toast } from 'react-toastify';
import setMessage from '../../utils/setters/setMessage';

import { Container, Progress, Options, ResponseView } from './styles';
import { InnerCenteredContainer } from '../../global/styles';
import { Loader } from '..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons';

import { Chat, Message, User } from '../../global/types';

interface Props {
  setShowAudioRecorder: (showAudioRecorder: boolean) => void;
  chat: Chat;
  user: User;
  text: string;
  setValue: (value: string) => void;
  responseMsg: Message | null;
  setResponseMsg: (responseMsg: Message | null) => void;
}

const AudioRecorder: React.FC<Props> = ({
  setShowAudioRecorder,
  chat,
  user,
  text,
  setValue,
  responseMsg,
  setResponseMsg,
}) => {
  const [timer, setTimer] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [timerInterval, setTimerInterval] = React.useState<NodeJS.Timeout | null>();
  const [width, setWidth] = React.useState(0);

  const increaseTimer = () => {
    setTimer(timer => (timer += 1));
  };

  const startTimer = () => {
    const timerInterval = setInterval(increaseTimer, 1000);
    setTimerInterval(timerInterval);
  };

  const stopTimer = React.useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  const startProgress = () => {
    const progressBar = document.querySelector('.progress-bar') as HTMLDivElement;
    progressBar.classList.add('animate-bar');
  };

  const stopProgress = React.useCallback(() => {
    const progressBar = document.querySelector('.progress-bar') as HTMLDivElement;
    progressBar.classList.remove('animate-bar');
    const width = 1.67 * timer;
    setWidth(width);
  }, [timer]);

  const start = () => {
    if (mediaRecorder?.state === 'inactive') {
      mediaRecorder?.start(1000);
      mediaRecorder?.addEventListener('dataavailable', event => {
        setAudioChunks(blobs => [...blobs, event.data]);
      });

      setIsRecording(true);
    }

    startTimer();
    startProgress();
  };

  const pause = () => {
    if (mediaRecorder?.state === 'recording') {
      mediaRecorder?.pause();
      setIsPaused(true);
    }

    stopTimer();
    stopProgress();
  };

  const resume = () => {
    if (mediaRecorder?.state === 'paused') {
      mediaRecorder?.resume();
      setIsPaused(false);
    }

    startTimer();
    startProgress();
  };

  const stop = React.useCallback(
    (control?: string) => {
      if (control === 'not_send') {
        return;
      } else {
        if (mediaRecorder?.state !== 'inactive') {
          mediaRecorder?.stop();
          const audioBlob = new Blob(audioChunks);
          responseMsg
            ? setMessage(
                chat,
                user,
                text,
                setValue,
                undefined,
                audioBlob,
                setShowAudioRecorder,
                responseMsg,
                setResponseMsg
              )
            : setMessage(chat, user, text, setValue, undefined, audioBlob, setShowAudioRecorder);
          setIsRecording(false);
        }
      }
      stopTimer();
      stopProgress();
    },
    [
      chat,
      user,
      text,
      setValue,
      setShowAudioRecorder,
      stopTimer,
      stopProgress,
      audioChunks,
      mediaRecorder,
      responseMsg,
      setResponseMsg,
    ]
  );

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

  React.useEffect(() => {
    if (timer === 80) {
      stop();
    }
  }, [timer, stop]);

  if (!mediaRecorder) {
    return (
      <Container>
        <InnerCenteredContainer>
          <Loader size="1rem" />
        </InnerCenteredContainer>
      </Container>
    );
  }
  return (
    <Container>
      {responseMsg && (
        <ResponseView>
          <div className="wrapper">
            <h2>Responding to {responseMsg.id === user.id ? 'yourself' : responseMsg.user.name}</h2>
            <div className="close" onClick={() => setResponseMsg(null)}>
              <FontAwesomeIcon icon={faTimes} size="2x" color="purple" />
            </div>
          </div>
          {responseMsg && (
            <p>
              {responseMsg.text.length > 50
                ? responseMsg.text.substring(0, 25) + '...'
                : responseMsg.text}
            </p>
          )}
          {responseMsg.media && (
            <p>
              {(responseMsg.media.images && 'Image') ||
                (responseMsg.media.videos && 'Video') ||
                (responseMsg.media.docs && 'File') ||
                (responseMsg.media.audios && 'Audio')}
            </p>
          )}
        </ResponseView>
      )}
      <Progress width={width}>
        <div className="progress">
          <div className="invisible">
            <div className="progress-bar"></div>
          </div>
        </div>
        <div className="timer">
          <span>{timer > 59 ? '1:00' : `0:${timer < 10 ? '0' + timer : timer}`}</span>
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
            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} size="2x" color="purple" />
          </div>
        )}
        <div
          onClick={() => {
            if (timerInterval) {
              clearInterval(timerInterval);
              setTimerInterval(null);
            }
            stop();
            setShowAudioRecorder(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="2x" color="red" />
        </div>
      </Options>
    </Container>
  );
};

export default AudioRecorder;
