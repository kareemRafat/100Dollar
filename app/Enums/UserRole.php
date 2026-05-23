<?php

namespace App\Enums;

enum UserRole: string
{
    case USER = 'user';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::USER => __('User'),
            self::ADMIN => __('Admin'),
        };
    }
}
