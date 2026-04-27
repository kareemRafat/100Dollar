import { User } from './auth';

export interface Idea {
    id: number;
    user_id: number;
    sponsor_id?: number;
    title: string;
    description: string;
    category: string;
    country: string;
    city: string;
    image?: string;
    pdf_file?: string;
    submission_day: number;
    week_number: number;
    year: number;
    status: 'pending' | 'approved' | 'rejected';
    votes_count: number;
    is_winner: boolean;
    rejection_reason?: string;
    approved_at?: string;
    winner_announced_at?: string;
    created_at: string;
    user?: User;
    sponsor?: Sponsor;
}

export interface Sponsor {
    id: number;
    name: string;
    logo: string;
    day_of_week: number;
    contract_start: string;
    contract_end: string;
    is_active: boolean;
}
