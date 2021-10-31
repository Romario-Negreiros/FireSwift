import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import handleFirebaseError from '../../../../utils/handleFirebaseError';

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

interface Inputs {
  password: string;
  confirmPassword: string;
}

interface Props {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const DeleteProfile: React.FC<Props> = ({ setIsModalVisible }) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isPassword1Visible, setIsPassword1Visible] = React.useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false);
      console.log(data);
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
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
              placeholder="Password"
              {...register('password', {
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
          <p>{errors.password?.message}</p>
          <div>
            <input
              type={isPassword2Visible ? 'text' : 'password'}
              placeholder="Confirm your password"
              {...register('confirmPassword', {
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
          <p>{errors.confirmPassword?.message}</p>
          <button type="submit">Delete profile</button>
        </Form>
      </FormBorder>
    </ModalBG>
  );
};

export default DeleteProfile;
