import { toast } from "react-toastify";

const handleFirebaseError = (err: unknown, setError?: (error: string) => void): void => {
  if(err instanceof Error) {
    if(setError) setError("Something went wrong, please try again!");
    else toast.error("Something went wrong, please try again!");
    // REFACTOR > SEE FIREBASE DOCS FOR LIST OF ERRORS!
    console.error(`Firebase Error => \n Error name: ${err.name} \n Error stack: ${err.stack} \n Error message: ${err.message}`)
  };
};

export default handleFirebaseError;