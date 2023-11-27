import { Document } from 'mongoose';
import { User } from 'src/Schema/user.schema';

export interface IBlog extends Document {
  readonly title: string;
  readonly text: string;
  readonly tags: string[];
  readonly user: User;
}
