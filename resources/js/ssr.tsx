import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./**/*.tsx', { eager: true });

            return (pages[`./${name}.tsx`] || pages[`./pages/${name}.tsx`]) as any;
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
);
