import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "./init";

const firestore = getFirestore(app);

export const retrieveData = async (collectionName: string) => {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const retrieveDataById = async (collectionName: string, id: string) => {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = await snapshot.data();
  return data;
};

export const signIn = async (email: string) => {
  const snapshot = await getDocs(query(collection(firestore, "users"), where("email", "==", email)));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length === 0) {
    return null;
  } else {
    return data[0];
  }
};

export const loginWithGoogle = async (data: any) => {
  const q = query(collection(firestore, "users"), where("email", "==", data.email));

  const snapshot = await getDocs(q);

  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    return user[0];
  } else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data);
  }
};
