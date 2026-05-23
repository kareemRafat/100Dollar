import type { UserRole } from './enums';
import type { Country } from './models';

export type User = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    country_id?: number;
    country?: Country;
    is_active: boolean;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
