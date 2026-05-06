import type { User } from './auth';

export interface Idea {
    id: number;
    user_id: number;
    sponsor_id?: number;
    category_id: number;
    category: string;
    category_icon?: string;
    title: string;
    description: string;
    country: string;
    city: string;
    image?: string;
    pdf_file?: string;
    marketing_channel?: string;
    target_audience?: string[];
    implementation_time?: string;
    submission_day: number;
    week_number: number;
    year: number;
    status: 'pending' | 'approved' | 'rejected' | 'winner';
    votes_count: number;
    is_winner: boolean;
    rejection_reason?: string;
    approved_at?: string;
    winner_announced_at?: string;
    created_at: string;
    date: string;
    progress: number;
    target_votes: number;
    funded: boolean;
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

export interface Comment {
    id: number;
    user_id: number;
    idea_id: number;
    body: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    user?: User;
}
