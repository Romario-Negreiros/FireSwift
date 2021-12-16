import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { userLogged } from '../../features/user/userSlice';

import { toast } from 'react-toastify';
import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { authentication, firestoredb } from '../../lib';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.png';

import { Loader } from '../../components';
import { Container } from './styles';
import { CenteredContainer } from '../../global/styles';
import { FormBorder, Form, ErrorBorder, ErrorMessage } from '../../global/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@firebase/auth';

interface Inputs {
  email: string;
  password: string;
  confirmpwd: string;
  name: string;
}

const CreateAccount: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, confirmpwd, name }) => {
    if (password === confirmpwd) {
      setIsLoaded(false);
      try {
        const response = await fetch(
          `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_EMAIL_API_KEY}&email=${email}`
        );
        const { deliverability, is_valid_format } = await response.json();
        if (deliverability === 'DELIVERABLE' && is_valid_format.value) {
          await authentication.createUserWithEmailAndPassword(authentication.auth, email, password);
          await authentication.signInWithEmailAndPassword(authentication.auth, email, password);
          const { uid } = authentication.auth.currentUser as User;
          const user = {
            email,
            name,
            friends: [],
            bio: '',
            age: null,
            relationship: '',
            isPrivate: false,
            picture: '',
            country: '',
            languages: [],
            hobbies: [],
          };
          await firestoredb.setDoc(firestoredb.doc(firestoredb.db, 'users', uid), user);
          dispatch(userLogged({ id: uid, ...user }));
          toast('User succesfully created!');
          history.push('/home');
        } else throw new Error("This email doesn't exist!");
      } catch (err) {
        handleFirebaseError(err, setError);
      } finally {
        setIsLoaded(true);
      }
    } else setError('Password and confirm password fields must be equal');
  };

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }
  return (
    <Container>
      {error && (
        <ErrorBorder>
          <ErrorMessage>
            <p>{error}</p>
          </ErrorMessage>
        </ErrorBorder>
      )}
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Create account</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Field cannot be empty!' })}
          ></input>
          <p>{errors.email?.message}</p>

          <div>
            <input
              autoComplete=""
              placeholder="Password"
              type={isPasswordVisible ? 'text' : 'password'}
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

          <div>
            <input
              autoComplete=""
              placeholder="Confirm password"
              type={isConfirmPwdVisible ? 'text' : 'password'}
              {...register('confirmpwd', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsConfirmPwdVisible(!isConfirmPwdVisible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isConfirmPwdVisible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.confirmpwd?.message}</p>

          <input
            placeholder="Name"
            {...register('name', {
              required: 'Field cannot be empty!',
              minLength: {
                value: 6,
                message: 'Minimum of 6 characters',
              },
              maxLength: {
                value: 30,
                message: 'Maximum of 30 characters',
              },
            })}
          />
          <p>{errors.name?.message}</p>

          <span className="redirect redirect-appear" onClick={() => history.push('/login')}>
            Login instead
          </span>
          <button type="submit">Create account</button>
        </Form>
      </FormBorder>
    </Container>
  );
};

export default CreateAccount;
