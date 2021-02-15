import firestore from '@react-native-firebase/firestore';
import toast from '@utils/toast';
import {INote} from '@store';

const db = firestore();

export const updateSyncCode = async (uid: string, syncCode?: string | null) => {
  try {
    if (syncCode === null) {
      await db.collection('syncCodes').doc(uid).delete();
    } else {
      const docData = await db.collection('syncCodes').doc(uid);
      await docData.set({syncCode: syncCode || uid});
      toast.success('Register success, ready to sync!');
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const getSyncCode = async (uid: string) => {
  const docData = await db.collection('syncCodes').doc(uid).get();
  if (!docData.exists) {
    return null;
  }
  return (docData.data() as any).syncCode as string;
};

export const getNotes = (syncCode: string) => {
  return db.collection('notes').doc(syncCode).collection('notes').get();
};

export const uploadNotes = async (syncCode: string, notes: INote[]) => {
  const doc = db.collection('notes').doc(syncCode);

  const docData = await doc.get();

  let lastSync: any = null;

  if (docData.exists) {
    lastSync = (docData.data() as any).lastSync as any;
  }

  const batch = db.batch();

  const notesToSync = lastSync
    ? notes.filter((note) => new Date(note.updatedAt) > lastSync.toDate())
    : notes;

  console.log('notesToSync', notesToSync);

  if (notesToSync.length) {
    notesToSync.forEach((note) => {
      batch.set(doc.collection('notes').doc(note.id), note);
    });
    batch.set(doc, {lastSync: new Date()});
    batch.commit().then(() => console.log('updated'));
    return true;
  }

  console.log('nothing to upload');
  return false;
};

export const streamNotes = (syncCode: string, observer: any) => {
  return db
    .collection('notes')
    .doc(syncCode)
    .collection('notes')
    .orderBy('updatedAt')
    .onSnapshot(observer);
};
