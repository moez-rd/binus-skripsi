import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./client";

export interface ThesisProps {
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

  const q = query(citiesRef, where("title", ">=", str));

  const querySnapshot = await getDocs(q);
  const theses: ThesisProps[] = querySnapshot.docs.map((doc) => {
    return {
      title: doc.data()["title"],
      studentId: doc.data()["studentName"],
      studentName: doc.data()["studentName"],
      year: doc.data()["year"],
      abstract: doc.data()["abstract"],
    } as ThesisProps;
  });

  console.log(theses);

  return theses;
}
