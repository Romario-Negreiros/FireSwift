import { toast } from "react-toastify";

const handleFirebaseError = (err: unknown, setError?: (error: string) => void): void => {
  if(err instanceof Error) {
    if(setError) setError(err.message);
    else toast.error(err.message);
    console.error(`Firebase Error => \n Error name: ${err.name} \n Error stack: ${err.stack} \n Error message: ${err.message}`)
  };
};

export default handleFirebaseError;