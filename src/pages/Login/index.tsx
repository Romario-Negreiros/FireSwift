import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUser, userLogged } from '../../features/user/userSlice';
import handleFirebaseError from '../../utils/general/handleFirebaseError';
import { authentication, firestoredb } from '../../lib';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';

import Logo from '../../assets/logo.png';

import { Container, CreateAccount } from './styles';
import { Form, FormBorder, ErrorBorder, ErrorMessage } from '../../global/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CenteredContainer } from '../../global/styles';
import { Loader } from '../../components';

import { User } from '@firebase/auth';
import { User as UserStateType } from '../../global/types';

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const userConnected = useAppSelector(state => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {

    try {
      setIsLoaded(false);
      await authentication.signInWithEmailAndPassword(authentication.auth, email, password);
      const { uid } = authentication.auth.currentUser as User;
      const userRef = firestoredb.doc(firestoredb.db, 'users', uid);
      const userSnap = await firestoredb.getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as Omit<UserStateType, 'id'>;
        const id = userSnap.id;
        dispatch(userLogged({ id, ...user }));
        firestoredb.onSnapshot(userRef, doc => {
          const docData = doc.data() as Omit<UserStateType, 'id'>;
          if (
            docData.chats.length !== userConnected?.chats.length ||
            docData.notifications.length !== userConnected?.chats.length
          ) {
            dispatch(updateUser({ id: doc.id, ...docData }));
          }
        });
      }
      history.push('/home');
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
            <h1>Login</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Field cannot be empty!' })}
          />
          <p>{errors.email?.message}</p>
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
          <span className="redirect" onClick={() => history.push('/createaccount')}>
            Create Account?
          </span>
          <button type="submit">Login</button>
        </Form>
      </FormBorder>
      <CreateAccount onClick={() => history.push('/createaccount')}>
        <div>
          <h1>Create</h1>
          <h1>Account?</h1>
        </div>
      </CreateAccount>
    </Container>
  );
};

export default Login;
