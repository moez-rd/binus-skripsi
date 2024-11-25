import {ObjectId} from "bson";

export interface Thesis {
    _id: ObjectId
    studentName: string,
    title: string,
    year: number,
    abstract: string
}