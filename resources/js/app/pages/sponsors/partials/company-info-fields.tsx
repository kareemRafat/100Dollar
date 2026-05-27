import { useLang } from '@erag/lang-sync-inertia/react';
import { Building2, Mail, Phone, Globe } from 'lucide-react';
import { CountrySelect } from '@/app/components/country-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Country {
    id: number;
    name_en: string;
    name_ar: string;
    code: string;
}

interface CompanyInfoFieldsProps {
    data: {
        company_name: string;
        email: string;
        phone: string;
        website: string;
        country_id: string;
    };
    setData: (field: string, value: any) => void;
    errors: Record<string, string>;
    countries: Country[];
}

export function CompanyInfoFields({
    data,
    setData,
    errors,
    countries,
}: CompanyInfoFieldsProps) {
    const { __ } = useLang();

    return (
        <>
            <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                    <Building2 className="size-3.5 text-primary" />
                    {__('messages.sponsors.company_name')}
                </Label>
                <Input
                    size="lg"
                    className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                    placeholder={__('messages.sponsors.company_name_placeholder')}
                    value={data.company_name}
                    onChange={(e) => setData('company_name', e.target.value)}
                    required
                />
                <InputError
                    message={
                        errors.company_name
                            ? __(errors.company_name)
                            : undefined
                    }
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                        <Mail className="size-3.5 text-primary" />
                        {__('messages.sponsors.company_email')}
                    </Label>
                    <Input
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                        placeholder={__('messages.contact.email_placeholder')}
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError
                        message={
                            errors.email ? __(errors.email) : undefined
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                        <Phone className="size-3.5 text-primary" />
                        {__('messages.sponsors.company_phone')}
                    </Label>
                    <Input
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                        placeholder="+966 50 000 0000"
                        type="tel"
                        dir="ltr"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                    <InputError
                        message={
                            errors.phone ? __(errors.phone) : undefined
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label className="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant">
                        <Globe className="size-3.5 text-primary" />
                        {__('messages.sponsors.company_website')}
                    </Label>
                    <Input
                        size="lg"
                        className="w-full border-none bg-surface-container-low px-4 text-on-surface transition-all focus:bg-white focus:ring-2 focus:ring-primary dark:bg-surface-container-high dark:text-white dark:focus:bg-surface-container-highest"
                        placeholder="https://company.com"
                        type="url"
                        dir="ltr"
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
                    />
                    <InputError
                        message={
                            errors.website ? __(errors.website) : undefined
                        }
                    />
                </div>
                <CountrySelect
                    value={data.country_id}
                    onValueChange={(val) => setData('country_id', val)}
                    countries={countries}
                    label={
                        <>
                            <Globe className="size-3.5 text-primary" />
                            {__('messages.submit_idea.country_label')}
                        </>
                    }
                    labelClassName="flex items-center gap-2 pe-2 text-sm font-bold text-on-surface-variant"
                    variant="flat"
                    required
                    error={
                        errors.country_id
                            ? __(errors.country_id)
                            : undefined
                    }
                />
            </div>
        </>
    );
}
