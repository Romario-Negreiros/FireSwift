import React from 'react';

import { useAppSelector } from '../../app/hooks';

// import handleFirebaseError from '../../utils/handleFirebaseError';
// import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.png';

import { CenteredContainer, FormBorder, ErrorBorder, ErrorMessage } from '../../global/styles';
import { Form, Grid, Select } from './styles';
import { Exception } from '../../components';

interface Inputs {
  bio: string;
  age: number;
  relationship: string;
  country: string;
}

const EditProfile: React.FC = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [error, setError] = React.useState<string>('');
  // const history = useHistory();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data, setError);
  };

  React.useEffect(() => {
    if (currentUser) {
      setValue('bio', currentUser.bio);
      setValue('country', currentUser.country);
      setValue('relationship', currentUser.relationship);
      if (currentUser.age) setValue('age', currentUser.age);
    }
  }, [currentUser, setValue]);

  if (!currentUser) {
    const message = 'User not found or not logged in!';
    return (
      <CenteredContainer>
        <Exception message={message} />
      </CenteredContainer>
    );
  }
  const ages: number[] = [];
  for (let x = 11; x < 99; x++) {
    ages.push(x);
  }
  return (
    <CenteredContainer>
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
            <h1>{currentUser.name}</h1>
          </div>
          <Grid>
            <input placeholder="Bio" {...register('bio')} />
            <Select>
              <p>Age</p>
              <select {...register('age')}>
                {ages.map((v, i) => (
                  <option value={i === 0 ? '' : v}>{i === 0 ? 'Select...' : v}</option>
                ))}
              </select>
            </Select>
            <Select>
              <p>Country</p>
              <select {...register('age')}>
                {ages.map((v, i) => (
                  <option value={i === 0 ? '' : v}>{i === 0 ? 'Select...' : v}</option>
                ))}
              </select>
            </Select>
            <Select>
              <p>Relationship</p>
              <select {...register('age')}>
                {ages.map((v, i) => (
                  <option value={i === 0 ? '' : v}>{i === 0 ? 'Select...' : v}</option>
                ))}
              </select>
            </Select>  
          </Grid>

          <button type="submit">Save updates</button>
        </Form>
      </FormBorder>
    </CenteredContainer>
  );
};

export default EditProfile;
