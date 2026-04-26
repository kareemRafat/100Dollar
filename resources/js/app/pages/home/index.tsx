import { Head } from '@inertiajs/react';
import AppLayout from '@/app/layouts/app-layout';
import Hero from './components/hero';
import DayTabs from './components/day-tabs';
import SponsorBanner from './components/sponsor-banner';
import VotingCountdown from './components/voting-countdown';
import IdeaList from './components/idea-list';
import PreviousWinners from './components/previous-winners';
import { Idea, Sponsor, Paginated } from '@/types';
import { useLang } from '@erag/lang-sync-inertia/react';

interface Props {
    ideas: Paginated<Idea>;
    sponsor?: Sponsor;
    previousWinners: Idea[];
    currentDay: number;
    secondsUntilEnd: number;
    weekDays: { id: number; name: string }[];
}

export default function Home({
    ideas,
    sponsor,
    previousWinners,
    currentDay,
    secondsUntilEnd,
    weekDays,
}: Props) {
    const { __ } = useLang();

    return (
        <AppLayout activeRoute="/">
            <Head title={__('messages.welcome')} />

            <Hero />

            <section className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
                <SponsorBanner sponsor={sponsor} />
                <VotingCountdown secondsUntilEnd={secondsUntilEnd} />
            </section>

            <DayTabs weekDays={weekDays} currentDay={currentDay} />

            <IdeaList ideas={ideas} />

            <PreviousWinners winners={previousWinners} />
        </AppLayout>
    );
}
