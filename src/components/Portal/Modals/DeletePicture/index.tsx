import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import authenticateUser from '../../../../utils/general/authenticateUser';
import handleFirebaseError from '../../../../utils/general/handleFirebaseError';
import { updateUser } from '../../../../features/user/userSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { firestoredb, storage } from '../../../../lib';
import { toast } from 'react-toastify';

import {
  ModalBG,
  FormBorder,
  Form,
  ErrorBorder,
  ErrorMessage,
  CloseModal,
} from '../../../../global/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../assets/logo.png';

import { ModalsProps } from '../../../../global/types';

interface Inputs {
  password: string;
}

const DeletePicture: React.FC<ModalsProps> = ({ setIsModalVisible, user }) => {
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    try {
      await authenticateUser(user.email, password);
      const storageRef = storage.ref(storage.storage, `users/${user.id}`);
      await storage.deleteObject(storageRef);
      const userRef = firestoredb.doc(firestoredb.db, 'users', user.id);
      await firestoredb.updateDoc(userRef, {
        picture: '',
      });
      dispatch(updateUser({ ...user, picture: '' }));
      toast('Picture succesfully deleted');
      setIsModalVisible(false);
    } catch (err) {
      handleFirebaseError(err, setError);
    }
  };

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
            <h1>Delete picture</h1>
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

export default DeletePicture;
