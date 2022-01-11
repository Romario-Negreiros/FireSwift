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

import { Group, User, Roles, GroupUser } from '../../../global/types';

interface Inputs {
  name: string;
  desc: string;
  privateGroup: string;
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

  const onSubmit: SubmitHandler<Inputs> = async ({ desc, name, privateGroup }) => {
    const files = getInputItems(['groupimg']);
    try {
      setIsLoaded(false);
      const group: Group = {
        id: uuidv4(),
        name,
        desc,
        creationDate: getFormattedDate(),
        owner: user,
        users: [],
        admins: [],
        private: Boolean(privateGroup),
        requests: {
          usersToJoin: [],
          postsToPublish: [],
        },
        posts: [],
        likes: [],
        picture: '',
      };
      const creatorUser: GroupUser = {
        id: user.id,
        name: user.name,
        picture: user.picture,
        chats: user.chats,
        groups: user.groups,
        notifications: user.notifications,
        entranceDate: getFormattedDate(),
        role: Roles.Owner,
      };
      group.users.push(creatorUser);
      if (files.images.length) {
        const { images } = files;
        const storageRef = storage.ref(storage.storage, `groups/${group.id}/bgImg`);
        await storage.uploadBytesResumable(storageRef, images[0]);
        const imgURL = await storage.getDownloadURL(storageRef);
        group.picture = imgURL;
      }
      const userCopy: User = JSON.parse(JSON.stringify(user));
      userCopy.groups.push({
        id: group.id,
        name: group.name,
        role: Roles.Owner,
      });
      await firestoredb.setDoc(firestoredb.doc(firestoredb.db, `groups`, group.id), group);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      await firestoredb.updateDoc(userRef, {
        groups: userCopy.groups,
      });
      dispatch(updateUser({ ...userCopy }));
      toast('Group succesfully created, you can see your groups in your profile!');
      reset();
      setError('');
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
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
              required: "You can't create a group without name!",
            })}
          ></input>
          <p>{errors.name?.message}</p>
          <TextField
            {...register('desc', {
              maxLength: {
                value: 150,
                message: 'Max length of 150 characters!',
              },
              minLength: {
                value: 30,
                message: 'Min length of 30 characters!',
              },
              required: "You can't create a group without description!",
            })}
            placeholder="Put your group description here..."
          />
          <p>{errors.desc?.message}</p>

          <h3>Add image for group's page background</h3>
          <CustomLabelBox htmlFor="groupimg">
            <FontAwesomeIcon icon={faImage} color="purple" size="2x" />
            <input
              type="file"
              accept="image/*"
              name="groupimg"
              id="groupimg"
              style={{ display: 'none' }}
            ></input>
          </CustomLabelBox>

          <div className="checkboxWrapper">
            <input
              {...register('privateGroup')}
              className="checkbox"
              type="checkbox"
              id="privateGroup"
              name="privateGroup"
              value="PrivateGroup"
            />
            <label htmlFor="privateGroup">Private group?</label>
          </div>

          <button type="submit">Create</button>
        </Form>
      </FormBorder>
    </CreationContainer>
  );
};

export default CreateGroup;
