const handleFirebaseError = (err: unknown, setError: (error: string) => void): void => {
  if(err instanceof Error) {
    setError(err.message);
  };
};

export default handleFirebaseError;