import { Post } from './post';
import { User } from './user';

export class Journal
{
    id: number;
    name: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}