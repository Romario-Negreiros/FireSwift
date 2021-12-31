import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../app/hooks';
import { updateUser } from '../../../features/user/userSlice';
import { firestoredb, storage } from '../../../lib';
import getFormattedDate from '../../../utils/getters/getFormattedDate';
import { useForm, SubmitHandler } from 'react-hook-form';
import getInputItems from '../../../utils/getters/getInputItems';
import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import { toast } from 'react-toastify';

import {
  CenteredContainer,
  CreationContainer,
  Form,
  FormBorder,
  ErrorBorder,
  ErrorMessage,
} from '../../../global/styles';
import { TextField, CustomLabelBox } from '../Post/styles';
import { Loader } from '../..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { Group, User, Roles } from '../../../global/types';

interface Inputs {
  name: string;
  desc: string;
  isPrivate: string;
}

interface Props {
  user: User;
}

const CreateGroup: React.FC<Props> = ({ user }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async ({ desc, name, isPrivate }) => {
    const files = getInputItems(['img']);
    try {
      setIsLoaded(false);
      const group: Group = {
        id: uuidv4(),
        name,
        desc,
        creationDate: getFormattedDate(),
        creator: user,
        users: [],
        admins: [],
        posts: [],
        private: Boolean(isPrivate),
        requests: [],
        likes: [],
        bgImg: '',
      };
      if (files.images) {
        const { images } = files;
        const storageRef = storage.ref(storage.storage, `groups/${group.id}/bgImg`);
        await storage.uploadBytesResumable(storageRef, images[0]);
        const imgURL = await storage.getDownloadURL(storageRef);
        group.bgImg = imgURL;
      }
      const userCopy: User = JSON.parse(JSON.stringify(user));
      userCopy.groups.push({
        id: group.id,
        name: group.name,
        role: Roles.Creator,
      });
      await firestoredb.setDoc(firestoredb.doc(firestoredb.db, `groups`, group.id), group);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      await firestoredb.updateDoc(userRef, {
        groups: userCopy.groups,
      });
      dispatch(updateUser({...userCopy}));
      toast('Group succesfully created, you can see your groups in your profile!');
      reset();
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
      setError('');
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
          <input
            placeholder="Group name..."
            {...register('name', {
              maxLength: {
                value: 25,
                message: 'Max length of 25 characters!',
              },
              minLength: {
                value: 5,
                message: 'Minimum length of 5 characters!',
              },
            })}
          ></input>
          <p>{errors.name?.message}</p>
          <TextField
            {...register('desc', {
              maxLength: {
                value: 150,
                message: 'Max length of 150 characters!',
              },
            })}
            placeholder="Put your group description here..."
          />
          <p>{errors.desc?.message}</p>

          <h3>Add image for group's page background</h3>
          <CustomLabelBox htmlFor="img">
            <FontAwesomeIcon icon={faImage} color="purple" size="2x" />
            <input
              type="file"
              accept="image/*"
              name="img"
              id="img"
              style={{ display: 'none' }}
            ></input>
          </CustomLabelBox>

          <div className="checkboxWrapper">
            <input
              {...register('isPrivate')}
              className="checkbox"
              type="checkbox"
              id="privateProfile"
              name="privateProfile"
              value="Private"
            />
            <label htmlFor="privateProfile">Private group?</label>
          </div>

          <button type="submit">Submit Post</button>
        </Form>
      </FormBorder>
    </CreationContainer>
  );
};

export default CreateGroup;
