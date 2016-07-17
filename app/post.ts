import { User } from './user';

export class Post
{
    id: number;
    user_id: number;
    journal_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user: User;
}