import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    only?: string[];
    className?: string;
}

export function Pagination({ links, only, className }: PaginationProps) {
    const { props } = usePage();
    const locale = props.locale as string;
    const isRtl = locale === 'ar';

    const renderLabel = (label: string) => {
        if (label.includes('laquo')) {
            return isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />;
        }
        if (label.includes('raquo')) {
            return isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />;
        }
        return label;
    };

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn('mx-auto flex w-full justify-center', className)}
        >
            <ul className="flex flex-row items-center gap-1">
                {links.map((link, index) => {
                    return (
                        <li key={index}>
                            {link.url === null ? (
                                <span
                                    className={cn(
                                        buttonVariants({
                                            variant: 'ghost',
                                            size: 'icon',
                                        }),
                                        'pointer-events-none opacity-50'
                                    )}
                                >
                                    {renderLabel(link.label)}
                                </span>
                            ) : (
                                <Link
                                    href={link.url}
                                    preserveState
                                    preserveScroll
                                    only={only}
                                    className={cn(
                                        buttonVariants({
                                            variant: link.active ? 'default' : 'ghost',
                                            size: 'icon',
                                        }),
                                        'h-9 w-9 p-0'
                                    )}
                                >
                                    {renderLabel(link.label)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
