import { v4 as uuidv4 } from 'uuid';
import { realtimedb, storage } from '../../lib';
import getFormattedDate from '../getters/getFormattedDate';
import { toast } from 'react-toastify';

import { Chat, Message, User } from '../../global/types';

interface Files {
  images: any[];
  videos: any[];
  docs: any[];
}

const clearInputs = (IDs: string[]) => {
  IDs.forEach(id => {
    const input = document.querySelector(`#${id}`) as HTMLInputElement;
    input.value = '';
  })
};

const setMessage = async (
  chat: Chat,
  user: User,
  text: string,
  setValue: (value: string) => void,
  files?: Files,
  audio?: Blob,
  setShowAudioRecorder?: (showAudioRecorder: boolean) => void,
) => {
  try {
    const message: Message = {
      id: uuidv4(),
      user: {
        id: user.id,
        name: user.name,
        picture: user.picture,
      },
      media: {
        images: [],
        videos: [],
        docs: [],
        audios: [],
      },
      text,
      viewed: false,
      sentDate: getFormattedDate(),
    };
    if(audio) {
      const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${message.id}/audios/0`);
      toast('Sending audio...');
      await storage.uploadBytesResumable(storageRef, audio);
      toast('Audio sent...')
      const audioURL = await storage.getDownloadURL(storageRef);
      message.media.audios?.push(audioURL);
    }
    if (files) {
      if (files.images.length) {
        if (files.videos.length || files.docs.length) {
          toast.error('You can only send one content per time!');
        } else {
          const { images } = files;
          const storageRef = storage.ref(
            storage.storage,
            `chats/${chat.id}/${message.id}/images/0`
          );
          toast('Sending image...');
          await storage.uploadBytesResumable(storageRef, images[0]);
          toast('Image sent.');
          const imgURL = await storage.getDownloadURL(storageRef);
          message.media.images.push(imgURL);
        }
      } else if (files.videos.length) {
        if (files.docs.length) {
          toast.error('You can only send one content per time');
        } else {
          const { videos } = files;
          const storageRef = storage.ref(
            storage.storage,
            `chats/${chat.id}/${message.id}/videos/0}`
          );
          toast('Sending video...');
          await storage.uploadBytesResumable(storageRef, videos[0]);
          toast('Video sent.');
          const vidURL = await storage.getDownloadURL(storageRef);
          message.media.videos.push(vidURL);
        }
      } else if (files.docs.length) {
        const { docs } = files;
        const storageRef = storage.ref(storage.storage, `chats/${chat.id}/${message.id}/docs/0`);
        toast('Sending file...');
        await storage.uploadBytesResumable(storageRef, docs[0]);
        toast('File sent.');
        const docURL = await storage.getDownloadURL(storageRef);
        const docObj = {
          url: docURL,
          name: docs[0].name,
        };
        message.media.docs.push(docObj);
      }
      clearInputs(['chatimg', 'chatvid', 'chatdoc']);
    }
    const updates: any = {};
    updates[`chats/${chat.id}/messages`] = [...chat.messages, message];
    await realtimedb.update(realtimedb.dbRef(realtimedb.db), updates);
    setValue('');
    if(setShowAudioRecorder) setShowAudioRecorder(false);
  } catch (err) {
    if (err instanceof Error) toast.error('Unable to send the message ' + err.message);
  }
};

export default setMessage;
