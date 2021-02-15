import {useEffect} from 'react';
import firebaseAuth from '@react-native-firebase/auth';

import toast from '@utils/toast';
import {useStore} from '@store';
import {getSyncCode} from './firestore';

export function useAuth() {
  const {auth, setAuth, setSyncCode} = useStore();

  async function startAuth() {
    if (!firebaseAuth().currentUser || !auth) {
      try {
        const result = await firebaseAuth().signInAnonymously();
        const uid = (result.user as any).uid;
        setAuth({uid});
        const syncCode = await getSyncCode(uid);
        if (syncCode) {
          setSyncCode(syncCode);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    startAuth();
  }, []);
}
