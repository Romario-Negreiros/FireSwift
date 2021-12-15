import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { firestoredb } from '../../../../lib';
import authenticateUser from '../../../../utils/general/authenticateUser';
import handleFirebaseError from '../../../../utils/general/handleFirebaseError';
import { useAppDispatch } from '../../../../app/hooks';
import { updateUser } from '../../../../features/user/userSlice';
import { toast } from 'react-toastify';

import {
  ModalBG,
  FormBorder,
  Form,
  ErrorBorder,
  ErrorMessage,
  CloseModal,
  CenteredContainer,
} from '../../../../global/styles';
import { Loader } from '../../../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../assets/logo.png';

import { ModalsProps } from '../../../../global/types';

interface Inputs {
  privateProfile: string;
  password: string;
}

const PrivateProfile: React.FC<ModalsProps> = ({ setIsModalVisible, user }) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ privateProfile, password }) => {
    if(Boolean(privateProfile) !== user.isPrivate) {
    try {
      setIsLoaded(false);
      await authenticateUser(user.email, password);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      await firestoredb.updateDoc(userRef, {
        isPrivate: Boolean(privateProfile),
      });
      dispatch(updateUser({ ...user, isPrivate: Boolean(privateProfile) }));
      toast('Changes succesfully saved!');
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
  } else setIsModalVisible(false);
  };

  if (!isLoaded) {
    return (
      <ModalBG>
        <CenteredContainer>
          <Loader />
        </CenteredContainer>
      </ModalBG>
    );
  }
  return (
    <ModalBG>
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CloseModal onClick={() => setIsModalVisible(false)}>
            <FontAwesomeIcon size="2x" color="purple" icon={faTimes} />
          </CloseModal>
          {error && (
            <ErrorBorder>
              <ErrorMessage>
                <p>{error}</p>
              </ErrorMessage>
            </ErrorBorder>
          )}
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Private profile</h1>
          </div>
          <div className="checkboxWrapper">
            <input {...register('privateProfile')} className="checkbox" type="checkbox" id="privateProfile" name="privateProfile" value="Private" />
            <label htmlFor="privateProfile">Private profile?</label>
          </div>
          <div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isPasswordVisible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.password?.message}</p>
          <button type="submit">Save updates</button>
        </Form>
      </FormBorder>
    </ModalBG>
  );
};

export default PrivateProfile;
