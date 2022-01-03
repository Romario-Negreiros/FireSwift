import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { firestoredb, storage } from '../../../lib';
import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import getInputItems from '../../../utils/getters/getInputItems';
import getFormattedDate from '../../../utils/getters/getFormattedDate';
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

import { Post, User, Group } from '../../../global/types';

interface Props {
  user: User;
  pathSegment: string;
  group?: Group;
}

interface Inputs {
  postContent: string;
}

const CreatePost: React.FC<Props> = ({ user, pathSegment, group }) => {
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
      const post: Post = {
        id: uuidv4(),
        authorID: user.id,
        author: user.name,
        formattedDate: currentDate,
        content: postContent,
        media: {
          images: [],
          videos: [],
          docs: [],
        },
        reactions: [],
        comments: [],
      };
      if (files.images) {
        const { images } = files;
        for (let img of images) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/${user.id}/${post.id}/images/${images.indexOf(img)}`
          );
          await storage.uploadBytesResumable(storageRef, img);
          const imgURL = await storage.getDownloadURL(storageRef);
          post.media.images.push(imgURL);
        }
      }
      if (files.videos) {
        const { videos } = files;
        for (let vid of videos) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/${user.id}/${post.id}/videos/${videos.indexOf(vid)}`
          );
          await storage.uploadBytesResumable(storageRef, vid);
          const vidURL = await storage.getDownloadURL(storageRef);
          post.media.videos.push(vidURL);
        }
      }
      if (files.docs) {
        const { docs } = files;
        for (let doc of files.docs) {
          const storageRef = storage.ref(
            storage.storage,
            `posts/${user.id}/${post.id}/docs/${docs.indexOf(doc)}`
          );
          await storage.uploadBytesResumable(storageRef, doc);
          const docURL = await storage.getDownloadURL(storageRef);
          const docObj = {
            url: docURL,
            name: doc.name,
          };
          post.media.docs.push(docObj);
        }
      }
      if (group) {
        post['groupID'] = group.id;
        const groupRef = firestoredb.doc(firestoredb.db, 'groups', group.id);
        const groupCopy: Group = JSON.parse(JSON.stringify(group));
        if (group.private) {
          groupCopy.requests.postsToPublish.push(post);
          await firestoredb.updateDoc(groupRef, {
            requests: groupCopy.requests,
          });
        } else {
          await firestoredb.setDoc(
            firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id),
            post
          );
          groupCopy.posts.push(post.id);
          await firestoredb.updateDoc(groupRef, {
            posts: groupCopy.posts,
          });
          toast('Post succesfully created!');
        }
      } else {
        await firestoredb.setDoc(
          firestoredb.doc(firestoredb.db, `media/posts/${pathSegment}`, post.id),
          post
        );
        toast('Post succesfully created!');
      }
      reset();
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
      setError('');
    }
  };

  const totalFilesLimiter = (event: React.FormEvent<HTMLInputElement>, type: string) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 6) {
      event.preventDefault();
      toast.error(`Maximum of five ${type}`);
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
      <FormBorder>
        {error && (
          <ErrorBorder>
            <ErrorMessage>
              <p>{error}</p>
            </ErrorMessage>
          </ErrorBorder>
        )}
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
