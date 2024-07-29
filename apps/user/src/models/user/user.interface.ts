import { Gender } from './user.enum';

export interface UserDocument {
  username: string;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
}
