import { ObjectId } from "mongodb";

export type Thesis = {
  _id?: ObjectId;
  studentName: string;
  studentId: string;
  title: string;
  year: number;
  abstract: string;
};

export type ThesisRequest = Omit<Thesis, "_id">;
