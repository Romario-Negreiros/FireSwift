import { toast } from 'react-toastify';

const handleError = (err: unknown, action: string, setError?: (error: string) => void) => {
  if (err instanceof Error) {
    if (setError) setError(`An error occurred during the following action: ${action}`);
    else toast.error(`Unable to complete the action, please try again!`);

    console.error(
      `An error occurred \n Action: ${action} \n Error name => ${err.name} \n Error stack trace => ${err.stack} \n Error message => ${err.message}`
    );
  }
};

export default handleError;
