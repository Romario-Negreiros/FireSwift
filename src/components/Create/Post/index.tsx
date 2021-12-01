import React from 'react';

// import { firestoredb } from '../../../lib';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CreationContainer, Form, FormBorder } from '../../../global/styles';
import { FileOptions, TextField, CustomLabelBox } from './styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id: string;
}

interface Inputs {
  postContent: string;
}

const CreatePost: React.FC<Props> = ({ id: string }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
  };

  return (
    <CreationContainer>
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('postContent', {
              maxLength: {
                value: 1000,
                message: 'Max length of 1000 characters!',
              },
            })}
            placeholder="Put your text here..."
          />
          <p>{errors.postContent?.message}</p>

          <h3>Add image, video or file</h3>
          <FileOptions>
            <li className="addTool">
              <CustomLabelBox htmlFor="img">
                <FontAwesomeIcon icon={faImage} color="purple" size="2x" />
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg"
                  name="img"
                  id="img"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
            <li className="addTool">
              <CustomLabelBox htmlFor="vid">
                <FontAwesomeIcon icon={faVideo} color="purple" size="2x" />
                <input
                  type="file"
                  accept=".mp4,.mov,.wmv,.avi,.avchd"
                  name="vid"
                  id="vid"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
            <li className="addTool">
              <CustomLabelBox htmlFor="doc">
                <FontAwesomeIcon icon={faFile} color="purple" size="2x" />
                <input
                  type="file"
                  accept=".mp4,.mov,.wmv,.avi,.avchd"
                  name="doc"
                  id="doc"
                  style={{ display: 'none' }}
                ></input>
              </CustomLabelBox>
            </li>
          </FileOptions>

          <button type="submit">Submit Post</button>
        </Form>
      </FormBorder>
    </CreationContainer>
  );
};

export default CreatePost;
