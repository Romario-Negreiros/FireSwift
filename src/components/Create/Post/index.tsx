import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { firestoredb, storage } from '../../../lib';
import handleFirebaseError from '../../../utils/handleFirebaseError';
import getInputItems from '../../../utils/getInputItems';
import getFormattedDate from '../../../utils/getFormattedDate';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  CenteredContainer,
  CreationContainer,
  Form,
  FormBorder,
  ErrorBorder,
  ErrorMessage,
} from '../../../global/styles';
import { FileOptions, TextField, CustomLabelBox } from './styles';
import { Loader } from '../..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../../global/types';

interface Props {
  user: User;
}

interface Inputs {
  postContent: string;
}

const CreatePost: React.FC<Props> = ({ user }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const [error, setError] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);

  const onSubmit: SubmitHandler<Inputs> = async ({ postContent }) => {
    const files = getInputItems(['img', 'doc', 'vid']);
    try {
      setIsLoaded(false);
      const currentDate = getFormattedDate();
      const post = {
        author: user.name,
        date: currentDate.date,
        time: currentDate.time,
        content: postContent,
      };
      const postID = uuidv4();
      await firestoredb.setDoc(
        firestoredb.doc(firestoredb.db, 'media/posts', `${user.id}/${postID}`),
        post
      );
      if (files.images) {
        const storageRef = storage.ref(storage.storage, `posts/${user.id}/${postID}/images`);
        for (let img of files.images) {
          await storage.uploadBytesResumable(storageRef, img);
        }
      }
      if (files.videos) {
        const storageRef = storage.ref(storage.storage, `posts/${user.id}/${postID}/videos`);
        for (let vid of files.videos) {
          await storage.uploadBytesResumable(storageRef, vid);
        }
      }
      if (files.docs) {
        const storageRef = storage.ref(storage.storage, `posts/${user.id}/${postID}/docs`);
        for (let doc of files.docs) {
          await storage.uploadBytesResumable(storageRef, doc);
        }
      }
      toast('Post succesfully created!');
      reset();
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
  };

  const totalFilesLimiter = (event: React.FormEvent<HTMLInputElement>, type: string) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 5) {
      event.preventDefault();
      toast(`Maximum of five ${type}`);
    }
  };

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }
  return (
    <CreationContainer>
      {error && (
        <ErrorBorder>
          <ErrorMessage>
            <p>{error}</p>
          </ErrorMessage>
        </ErrorBorder>
      )}
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('postContent', {
              maxLength: {
                value: 1000,
                message: 'Max length of 1000 characters!',
              },
            })}
            placeholder="Put your text here..."
          />
          <p>{errors.postContent?.message}</p>

          <h3>Add image, video or file</h3>
          <FileOptions>
            <li className="addTool">
              <CustomLabelBox htmlFor="img">
                <FontAwesomeIcon icon={faImage} color="purple" size="2x" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={event => totalFilesLimiter(event, 'images')}
                  name="img"
                  id="img"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
            <li className="addTool">
              <CustomLabelBox htmlFor="vid">
                <FontAwesomeIcon icon={faVideo} color="purple" size="2x" />
                <input
                  type="file"
                  accept="video/*"
                  name="vid"
                  id="vid"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
            <li className="addTool">
              <CustomLabelBox htmlFor="doc">
                <FontAwesomeIcon icon={faFile} color="purple" size="2x" />
                <input
                  type="file"
                  accept=".pdf,.word"
                  multiple
                  onChange={event => totalFilesLimiter(event, 'documents')}
                  name="doc"
                  id="doc"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
          </FileOptions>

          <button type="submit">Submit Post</button>
        </Form>
      </FormBorder>
    </CreationContainer>
  );
};

export default CreatePost;
