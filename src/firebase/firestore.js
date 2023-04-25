import {
  doc,
  deleteDoc,
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { app} from './firebase.js';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);

export const salvarPost = async (date, id, text, username) => {
  const auth = getAuth();
  addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    date,
    id,
    like: [],
    text,
    username,
  });
}

export const pegarPost = async () => {
  const mensage = [];
  const order = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const snapShot = await getDocs(order);
  snapShot.forEach((item) => {
    const data = item.data();
    data.id = item.id;
    data.date = data.date.toDate().toLocaleDateString();
    mensage.push(data);
  });
  return mensage;
};

export const deletarPost = async (postId) => {
  deleteDoc(doc(db, 'posts', postId));
};

export const editarPosts = async (postId, text) => {
  const atualizarPostsEditados = doc(db, 'posts', postId);
  await updateDoc(atualizarPostsEditados, {
    text,
  });
};
