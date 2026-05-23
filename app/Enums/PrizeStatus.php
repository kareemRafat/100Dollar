<?php

namespace App\Enums;

enum PrizeStatus: string
{
    case PENDING = 'pending';
    case DELIVERED = 'delivered';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => __('Pending'),
            self::DELIVERED => __('Delivered'),
        };
    }
}
