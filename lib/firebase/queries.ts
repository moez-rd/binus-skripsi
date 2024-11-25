import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  or,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "./client";

export interface ThesisProps {
  id?: string;
  studentName: string;
  studentId: string;
  title: string;
  year: number;
  abstract: string;
}

export async function insertThesis(thesis: ThesisProps) {
  await addDoc(collection(firestore, "theses"), thesis);
}

export async function searchThesis(str: string) {
  const citiesRef = collection(firestore, "theses");
  const q = query(citiesRef, or(where("title", ">=", str)));
  const querySnapshot = await getDocs(q);
  const theses: ThesisProps[] = querySnapshot.docs.map((doc) => {
    return {
      title: doc.data()["title"],
      studentId: doc.data()["studentId"],
      studentName: doc.data()["studentName"],
      year: doc.data()["year"],
      abstract: doc.data()["abstract"],
    } as ThesisProps;
  });

  return theses.sort((a, b) => b.title.indexOf(str));
}

export async function geAllThesis() {
  const querySnapshot = await getDocs(collection(firestore, "theses"));
  const theses: ThesisProps[] = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      title: doc.data()["title"],
      studentId: doc.data()["studentId"],
      studentName: doc.data()["studentName"],
      year: doc.data()["year"],
      abstract: doc.data()["abstract"],
    } as ThesisProps;
  });

  return theses;
}

export async function getThesisById(id: string) {
  const querySnapshot = await getDoc(doc(firestore, "theses", id));

  if (!querySnapshot.exists()) {
    return;
  }

  const theses: ThesisProps = {
    id: querySnapshot.id,
    title: querySnapshot.data()["title"],
    studentId: querySnapshot.data()["studentId"],
    studentName: querySnapshot.data()["studentName"],
    year: querySnapshot.data()["year"],
    abstract: querySnapshot.data()["abstract"],
  } as ThesisProps;

  return theses;
}
