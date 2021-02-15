import {useEffect} from 'react';

import {useStore} from '@store';
import {streamNotes, uploadNotes} from '@firebase/firestore';
import toast from '@utils/toast';

function useSyncNote() {
  const {auth, notes, setNotes, setLastSync, syncCode} = useStore();

  useEffect(() => {
    if (!auth || !syncCode) {
      return;
    }

    const unsubscribe = streamNotes(syncCode, {
      next: (querySnapshot: any) => {
        let notesToSync = notes;
        let needSync = false;
        console.log('check sync', querySnapshot.docs.length);
        querySnapshot.docs.forEach((doc: any) => {
          const note = doc.data();
          const found = notesToSync.find((item) => item.id === note.id);
          if (!found) {
            notesToSync.push({...note, justSynced: true});
            needSync = true;
          } else if (new Date(found.updatedAt) < new Date(note.updatedAt)) {
            notesToSync = notesToSync.map((item) =>
              item.id === note.id ? {...note, justSynced: true} : item,
            );
            needSync = true;
          }
        });
        if (needSync) {
          console.log('ready sync', notesToSync);
          setNotes(notesToSync);
          toast.success('Notes synced!');
          setLastSync();
        } else {
          console.log('no need to sync');
        }
      },
    });

    const intervalId = setInterval(async () => {
      const synced = await uploadNotes(syncCode, notes);
      if (synced) {
        setLastSync();
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(intervalId);
    };
  }, [auth, notes, setNotes, setLastSync, syncCode]);
}

export default useSyncNote;
