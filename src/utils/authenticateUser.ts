import { authentication } from '../lib';

const authenticateUser = async (email: string, password: string) => {
  return authentication.signInWithEmailAndPassword(authentication.auth, email, password);
};  

export default authenticateUser;