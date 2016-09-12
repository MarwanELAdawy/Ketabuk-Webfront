import { Journal } from './journal';

export class User
{
    id: number;
    name: string;
    created_at: Date;
    update_at: Date;
    journal: Journal;
}