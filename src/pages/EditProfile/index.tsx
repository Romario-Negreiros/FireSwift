import React from 'react';

import { useAppSelector } from '../../app/hooks';

// import handleFirebaseError from '../../utils/handleFirebaseError';
// import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.png';

import { CenteredContainer, ErrorBorder, ErrorMessage } from '../../global/styles';
import { FormBorder, Form, Grid, Wrapper, Container } from './styles';
import { Exception, DraggableList } from '../../components';

interface Data {
  countriesNames: {
    name: string;
  }[];
  countriesLanguages: {
    name: string;
    image: string;
  }[];
}

interface Inputs {
  bio: string;
  age: number;
  relationship: string;
  country: string;
}

interface Response {
  name: string;
  languages: {
    nativeName: string;
  }[];
  flags: {
    svg: string;
  }
}

const EditProfile: React.FC = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [error, setError] = React.useState<string>('');
  const [data, setData] = React.useState<Data>();
  // const history = useHistory();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data, setError);
  };

  const fetchData = async (countries: string, hobbies?: string) => {
    try {
      const response = await fetch(countries);
      const json = await response.json() as Response[];
      const data: Partial<Data> = {}
      data['countriesNames'] = json.filter(country => {
        return { name: country.name }
      });
      const countriesLanguages = json.filter(country => {
        return { name: country.languages[country.languages.length - 1].nativeName, image: country.flags.svg }
      });
      data['countriesLanguages'] = [...countriesLanguages] as unknown as Data['countriesLanguages'];
      setData(data as Data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  React.useEffect(() => {
    if (currentUser) {
      fetchData('https://restcountries.com/v2/all?fields=name,languages,flags');
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
            <h1>Edit Profile</h1>
          </div>
          <Grid>
            <Wrapper>
              <p>Bio</p>
              <input {...register('bio')} />
            </Wrapper>
            <Wrapper>
              <p>Age</p>
              <select {...register('age')}>
                {ages.map((v, i) => (
                  <option value={i === 0 ? '' : v}>{i === 0 ? 'Select...' : v}</option>
                ))}
              </select>
            </Wrapper>
            <Wrapper>
              <p>Country</p>
              <select {...register('age')}>
                {data?.countriesNames?.map((country, i) => (
                  <option value={i === 0 ? '' : country.name}>
                    {i === 0 ? 'Select...' : country.name}
                  </option>
                ))}
              </select>
            </Wrapper>
            <Wrapper>
              <p>Relationship</p>
              <select {...register('age')}>
                <option value="">Select...</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Dating">Dating</option>
              </select>
            </Wrapper>
          </Grid>
          {data && (
            <>
              <DraggableList title="Languages" currentUser={currentUser} data={data.countriesLanguages} />
              {/* <DraggableList title="Hobbies" currentUser={currentUser} data={data} /> */}
            </>
          )}

          <button type="submit">Save updates</button>
        </Form>
      </FormBorder>
    </Container>
  );
};

export default EditProfile;
