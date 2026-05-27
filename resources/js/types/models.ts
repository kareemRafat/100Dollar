import type { User } from './auth';
import type { IdeaStatus, PrizeStatus, SponsorshipStatus } from './enums';

export interface Country {
    id: number;
    name_ar: string;
    name_en: string;
    code: string;
}

export interface Idea {
    id: number;
    user_id: number;
    sponsor_id?: number;
    category_id: number;
    category: string | Category;
    category_icon?: string;
    title: string;
    description: string;
    country: string;
    city: string;
    image?: string;
    pdf_file?: string;
    marketing_channel?: string[];
    target_audience?: string[];
    implementation_time?: string;
    submission_day: number;
    week_number: number;
    year: number;
    status: IdeaStatus;
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

export interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    icon: string;
}

export interface Sponsor {
    id: number;
    name: string;
    logo: string;
    day_of_week: number;
    contract_start: string;
    contract_end: string;
    is_active: boolean;
    ideas_count?: number;
    prize_records_count?: number;
}

export interface SponsorshipRequest {
    id: number;
    company_name: string;
    email: string;
    phone: string;
    website?: string;
    country_id: number;
    country?: Country;
    message: string;
    status: SponsorshipStatus;
    rejection_reason?: string;
    locale?: string;
    logo?: string;
    created_at: string;
}

export interface PrizeRecord {
    id: number;
    idea_id: number;
    sponsor_id: number;
    amount: number;
    status: PrizeStatus;
    delivered_at?: string;
    created_at: string;
    sponsor?: Sponsor;
    idea?: Idea;
}

export interface Comment {
    id: number;
    user_id: number;
    idea_id: number;
    body: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    deleted_at?: string;
    is_deleted: boolean;
    user?: User;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    reply_body?: string | null;
    replied_at?: string | null;
    is_replied: boolean;
    created_at: string;
}
