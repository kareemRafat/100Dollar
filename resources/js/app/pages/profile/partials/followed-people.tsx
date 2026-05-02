import { useLang } from '@erag/lang-sync-inertia/react';
import { Link, useForm } from '@inertiajs/react';
import { Users, UserMinus, User } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { follow } from '@/routes/app/users';
import { toast } from '@/app/components/ui/toast';

type Person = {
    id: number;
    name: string;
    bio?: string;
};

type Props = {
    people: Person[];
};

export default function FollowedPeople({ people = [] }: Props) {
    const { __ } = useLang();
    const { post, processing } = useForm();

    const handleUnfollow = (id: number, name: string) => {
        post(follow(id).url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(__('messages.profile.followed_people'), `${__('messages.archive.unfollow_user_success')}: ${name}`);
            },
        });
    };

    if (people.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant/20 bg-surface-container-lowest p-12 text-center dark:bg-surface-container-low">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="size-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-secondary dark:text-white">
                    {__('messages.profile.no_followed_people')}
                </h3>
                <p className="mb-6 max-w-sm text-on-surface-variant/60">
                    {__('messages.about.mission_desc')}
                </p>
                <Link
                    href="/archive"
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                    {__('messages.ui.browse_full_archive')}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-secondary dark:text-white">
                {__('messages.profile.followed_people')} ({people.length})
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {people.map((person) => (
                    <div
                        key={person.id}
                        className="flex items-center gap-4 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4 transition-all hover:border-primary/20 hover:shadow-md dark:bg-surface-container-low"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:bg-white/10 dark:text-white/60">
                            <User className="size-6" />
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <h3 className="truncate text-sm font-bold text-secondary dark:text-white">
                                {person.name}
                            </h3>
                            {person.bio && (
                                <p className="truncate text-[10px] text-on-surface-variant/60">
                                    {person.bio}
                                </p>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-on-surface-variant hover:text-red-500"
                            onClick={() => handleUnfollow(person.id, person.name)}
                            disabled={processing}
                        >
                            <UserMinus className="size-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
