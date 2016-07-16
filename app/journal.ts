import { Post } from './post';
import { User } from './user';

export class Journal
{
    id: number;
    posts: Post[];
    user: User;
}