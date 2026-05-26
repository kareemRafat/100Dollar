import { Head } from '@inertiajs/react';

interface IdeaMetaHeadProps {
    title: string;
    appName: string;
    shareMeta: {
        title: string;
        description: string;
        url: string;
        image: string | null;
        image_type: string | null;
    };
}

export function IdeaMetaHead({ title, appName, shareMeta }: IdeaMetaHeadProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta
                head-key="description"
                name="description"
                content={shareMeta.description}
            />

            <meta head-key="og:type" property="og:type" content="article" />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={appName}
            />
            <meta
                head-key="og:url"
                property="og:url"
                content={shareMeta.url}
            />
            <meta
                head-key="og:title"
                property="og:title"
                content={shareMeta.title}
            />
            <meta
                head-key="og:description"
                property="og:description"
                content={shareMeta.description}
            />
            {shareMeta.image && (
                <>
                    <meta
                        head-key="og:image"
                        property="og:image"
                        content={shareMeta.image}
                    />
                    <meta
                        head-key="og:image:secure_url"
                        property="og:image:secure_url"
                        content={shareMeta.image}
                    />
                    {shareMeta.image_type && (
                        <meta
                            head-key="og:image:type"
                            property="og:image:type"
                            content={shareMeta.image_type}
                        />
                    )}
                    <meta
                        head-key="og:image:width"
                        property="og:image:width"
                        content="1200"
                    />
                    <meta
                        head-key="og:image:height"
                        property="og:image:height"
                        content="630"
                    />
                </>
            )}

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:url"
                name="twitter:url"
                content={shareMeta.url}
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={shareMeta.title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={shareMeta.description}
            />
            {shareMeta.image && (
                <meta
                    head-key="twitter:image"
                    name="twitter:image"
                    content={shareMeta.image}
                />
            )}
        </Head>
    );
}
