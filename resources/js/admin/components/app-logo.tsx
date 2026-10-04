import { BrandLogo } from '@/app/components/brand-logo';

export default function AppLogo() {
    return (
        <>
            <BrandLogo alt="100Dollar" className="h-8" scope="admin" />
            <span className="sr-only">100Dollar</span>
        </>
    );
}