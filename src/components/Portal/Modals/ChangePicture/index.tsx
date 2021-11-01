import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import authenticateUser from '../../../../utils/authenticateUser';
import handleFirebaseError from '../../../../utils/handleFirebaseError';
import { storage } from '../../../../lib';
import { toast } from 'react-toastify';

import {
  ModalBG,
  FormBorder,
  Form,
  ErrorBorder,
  ErrorMessage,
  CloseModal,
} from '../../../../global/styles';
import { Progress, Input, InputFileLabel } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEye,
  faEyeSlash,
  faFileUpload,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../assets/logo.png';

import { ModalsProps } from '../../../../global/types';

interface Inputs {
  password: string;
}

const ChangePicture: React.FC<ModalsProps> = ({ setIsModalVisible, user }) => {
  const [error, setError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [hasFile, setHasFile] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    try {
      await authenticateUser(user.email, password);
      const input = document.querySelector('.image') as HTMLInputElement;
      const storageRef = storage.ref(storage.storage, `users/${user.id}`);
      if(input.files && input.files[0]) {
        const image = input.files[0];
        const task = await storage.uploadBytesResumable(storageRef, image);
        const { totalBytes, bytesTransferred } = task;
        const progress = (totalBytes / bytesTransferred) * 100;
        const progressBar = document.querySelector('#file_progress') as HTMLProgressElement;
        progressBar.value = progress;
      } else await storage.deleteObject(storageRef);
      toast('Picture succesfully changed');
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
            <h1>Change picture</h1>
          </div>
          <InputFileLabel>
            <Input
              type="file"
              className="image"
              name="image"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                event.currentTarget.files ? setHasFile(true) : setHasFile(false);
              }}
            ></Input>
            Choose picture
            <FontAwesomeIcon
              size="1x"
              color="purple"
              icon={hasFile ? faFileAlt : faFileUpload}
            ></FontAwesomeIcon>
          </InputFileLabel>
          <Progress id="file_progress" value="0" max="100"></Progress>
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

export default ChangePicture;
