import { ObjectId } from "mongodb"; // allows us to have an id value from MongoDB

export default interface Sushi {
  _id?: ObjectId; // optional because MongoDB adds it
  name: string;
  price: number;
}