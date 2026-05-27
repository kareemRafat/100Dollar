import { useLang } from '@erag/lang-sync-inertia/react';
import { Mail, AlertCircle, MoreHorizontal, Rocket } from 'lucide-react';
import type { SubmitEvent } from 'react';
import { Button } from '@/app/components/ui/button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormProps {
    data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    recentlySuccessful: boolean;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export function ContactForm({
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
    onSubmit,
}: ContactFormProps) {
    const { __ } = useLang();

    const subjects = [
        {
            value: 'general',
            label: __('messages.contact.subject_general'),
            icon: Mail,
        },
        {
            value: 'sponsorship',
            label: __('messages.contact.subject_sponsorship'),
            icon: Rocket,
        },
        {
            value: 'complaint',
            label: __('messages.contact.subject_complaint'),
            icon: AlertCircle,
        },
        {
            value: 'other',
            label: __('messages.contact.subject_other'),
            icon: MoreHorizontal,
        },
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                        {__('messages.contact.name_label')}
                    </Label>
                    <Input
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                        placeholder={__(
                            'messages.contact.name_placeholder',
                        )}
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                            setData('name', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={
                            errors.name
                                ? __(errors.name)
                                : undefined
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                        {__('messages.contact.email_label')}
                    </Label>
                    <Input
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                        placeholder={__(
                            'messages.contact.email_placeholder',
                        )}
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={
                            errors.email
                                ? __(errors.email)
                                : undefined
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                    {__('messages.contact.subject_label')}
                </Label>
                <Select
                    value={data.subject}
                    onValueChange={(val) =>
                        setData('subject', val)
                    }
                    required
                >
                    <SelectTrigger
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white"
                    >
                        <SelectValue
                            placeholder={__(
                                'messages.contact.subject_label',
                            )}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem
                                key={subject.value}
                                value={subject.value}
                            >
                                <div className="flex items-center gap-2">
                                    <subject.icon className="size-4 text-primary" />
                                    {subject.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError
                    message={
                        errors.subject
                            ? __(errors.subject)
                            : undefined
                    }
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="pe-2 text-sm font-bold text-on-surface-variant">
                    {__('messages.contact.message_label')}
                </Label>
                <Textarea
                    className="h-32 w-full resize-none border-none bg-surface-container-low p-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                    placeholder={__(
                        'messages.contact.message_placeholder',
                    )}
                    value={data.message}
                    onChange={(e) =>
                        setData('message', e.target.value)
                    }
                    required
                />
                <InputError
                    message={
                        errors.message
                            ? __(errors.message)
                            : undefined
                    }
                />
            </div>
            <Button
                className="h-12 w-full text-lg font-bold md:w-auto md:px-12"
                type="submit"
                disabled={processing}
            >
                {processing
                    ? __('messages.common.processing')
                    : __('messages.contact.send_button')}
            </Button>
            {recentlySuccessful && (
                <p className="text-sm font-medium text-success">
                    {__('messages.contact.success_message')}
                </p>
            )}
        </form>
    );
}
