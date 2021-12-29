import React from 'react';

import { v4 as uuidv4 } from 'uuid';
// import { firestoredb, storage } from '../../../lib';
// import handleFirebaseError from '../../../utils/general/handleFirebaseError';
import getFormattedDate from '../../../utils/getters/getFormattedDate';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { toast } from 'react-toastify';

import {
  CenteredContainer,
  CreationContainer,
  Form,
  FormBorder,
  ErrorBorder,
  ErrorMessage,
} from '../../../global/styles';
// import { FileOptions, TextField, CustomLabelBox } from '../Post/styles';
import { Loader } from '../..';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Group } from '../../../global/types';

interface Inputs {
  desc: string;
  name: string;
}

const CreateGroup: React.FC = () => {
  const {
    // register,
    // formState: { errors },
    handleSubmit,
    // reset,
  } = useForm<Inputs>();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [error, setError] = React.useState('');

  const onSubmit: SubmitHandler<Inputs> = async ({ desc, name }) => {
    const group: Group = {
      id: uuidv4(),
      name,
      desc,
      creationDate: getFormattedDate(),
      users: [],
    }
    console.log(group, setIsLoaded, setError);
  };

  if (!isLoaded) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }
  return (
    <CreationContainer>
      <FormBorder>
        {error && (
          <ErrorBorder>
            <ErrorMessage>
              <p>{error}</p>
            </ErrorMessage>
          </ErrorBorder>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <TextField */}
            {/* {...register('desc', { */}
              {/* maxLength: { */}
                {/* value: 150, */}
                {/* message: 'Max length of 150 characters!', */}
              {/* }, */}
            {/* })} */}
            {/* placeholder="Put your group description here..." */}
          {/* /> */}
          {/* <p>{errors.desc?.message}</p> */}
          <input
            
          >
          
          </input>
        </Form>
      </FormBorder>
    </CreationContainer>
  );
};

export default CreateGroup;
