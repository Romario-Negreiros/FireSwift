import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../../app/hooks';
import { updateUser } from '../../../../features/user/userSlice';
import handleFirebaseError from '../../../../utils/handleFirebaseError';
import authenticateUser from '../../../../utils/authenticateUser';
import { firestoredb } from '../../../../lib';
import { toast } from 'react-toastify';

import {
  ModalBG,
  FormBorder,
  Form,
  ErrorBorder,
  ErrorMessage,
  CenteredContainer,
  CloseModal,
} from '../../../../global/styles';
import { Loader } from '../../../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../assets/logo.png';

import { ModalsProps } from '../../../../global/types';

interface Inputs {
  newName: string;
  password: string;
}

const ChangeAccountName: React.FC<ModalsProps> = ({ setIsModalVisible, user }) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      newName: user.name,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ newName, password }) => {
    try {
      setIsLoaded(false);
      await authenticateUser(user.email, password);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      await firestoredb.updateDoc(userRef, {
        newName,
      });
      dispatch(updateUser({ ...user, name: newName }));
      toast('Name succesfully updated');
      setIsModalVisible(false);
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
              <ErrorMessage>
                <p>{error}</p>
              </ErrorMessage>
            </ErrorBorder>
          )}
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Change name</h1>
          </div>
          <input
            {...register('newName', {
              required: 'Field cannot be empty!',
              minLength: {
                value: 6,
                message: 'Minimum of 6 characters.',
              },
            })}
          />
          <p>{errors.newName?.message}</p>
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

export default ChangeAccountName;
