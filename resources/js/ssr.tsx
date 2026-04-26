import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) =>
            resolvePageComponent(
                `/resources/js/${name}.tsx`,
                import.meta.glob('/resources/js/**/*.tsx'),
            ),
        setup: ({ App, props }) => <App {...props} />,
    }),
);
