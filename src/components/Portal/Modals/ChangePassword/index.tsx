import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import authenticateUser from '../../../../utils/authenticateUser';
import handleFirebaseError from '../../../../utils/handleFirebaseError';
import { authentication } from '../../../../lib';

import {
  ModalBG,
  FormBorder,
  Form,
  ErrorBorder,
  ErrorMessage,
  CloseModal,
  CenteredContainer,
} from '../../../../global/styles';
import { Loader } from '../../..';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../assets/logo.png';

import { ModalsProps } from '../../../../global/types';
import { toast } from 'react-toastify';

interface Inputs {
  newPassword: string;
  oldPassword: string;
  confirmOldPassword: string;
}

const ChangePassword: React.FC<ModalsProps> = ({ setIsModalVisible, user }) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isPassword1Visible, setIsPassword1Visible] = React.useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = React.useState(false);
  const [isPassword3Visible, setIsPassword3Visible] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ newPassword, oldPassword, confirmOldPassword }) => {
    if(oldPassword === confirmOldPassword) {
    try {
      setIsLoaded(false);
      await authenticateUser(user.email, oldPassword);
      const userRef = authentication.auth.currentUser;
      if(userRef)
      await authentication.updatePassword(userRef, newPassword);
      toast('Password succesfully updated!');
      setIsModalVisible(false);
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
  } else setError('Old password and confirm old password fields must be equal!')
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
              <ErrorMessage>{error}</ErrorMessage>
            </ErrorBorder>
          )}
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Login</h1>
          </div>
          <div>
            <input
              type={isPassword1Visible ? 'text' : 'password'}
              placeholder="New password"
              {...register('newPassword', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsPassword1Visible(!isPassword1Visible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isPassword1Visible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.newPassword?.message}</p>
          <div>
            <input
              type={isPassword2Visible ? 'text' : 'password'}
              placeholder="Old Password"
              {...register('oldPassword', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsPassword2Visible(!isPassword2Visible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isPassword2Visible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.oldPassword?.message}</p>
          <div>
            <input
              type={isPassword3Visible ? 'text' : 'password'}
              placeholder="Confirm Old Password"
              {...register('confirmOldPassword', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsPassword3Visible(!isPassword3Visible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isPassword3Visible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.confirmOldPassword?.message}</p>
          <button type="submit">Save updates</button>
        </Form>
      </FormBorder>
    </ModalBG>
  );
};

export default ChangePassword;
