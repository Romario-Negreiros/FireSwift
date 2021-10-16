import React from 'react';

import handleFirebaseError from '../../utils/handleFirebaseError';
import { authentication } from '../../lib';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';

import Logo from '../../assets/logo.png';

import { Container, FormBorder, Form, CreateAccount, ErrorBorder, ErrorMessage } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../../components';

interface Inputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
  console.log(email, password)
    try {
      setIsLoaded(false);
      await authentication.signInWithEmailAndPassword(authentication.auth, email, password);
      history.push('/home');
    } catch (err) {
      handleFirebaseError(err, setError);
    } finally {
      setIsLoaded(true);
    }
  };

  if (!isLoaded) {
    return <Loader />;
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
