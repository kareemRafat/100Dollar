import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState } from 'react';

export function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 z-0"
            options={
                {
                    autoPlay: true,
                    fullScreen: { enable: false },
                    fpsLimit: 120,
                    interactivity: {
                        detectsOn: 'window',
                        events: {
                            onClick: { enable: true, mode: 'push' },
                            onHover: {
                                enable: true,
                                mode: 'grab',
                                parallax: {
                                    enable: true,
                                    force: 60,
                                    smooth: 10,
                                } as any,
                            },
                            resize: { enable: true } as any,
                        },
                        modes: {
                            grab: {
                                distance: 200,
                                links: { opacity: 0.2 },
                            },
                            push: { quantity: 2 },
                        },
                    },
                    particles: {
                        color: {
                            value: ['#B8860B', '#f7bd48', '#986d00', '#ffdea6'],
                        },
                        links: {
                            color: '#B8860B',
                            distance: 150,
                            enable: true,
                            opacity: 0.3,
                            width: 0.5,
                        },
                        move: {
                            enable: true,
                            speed: 0.5,
                            direction: 'none',
                            outModes: { default: 'out' },
                            parallax: {
                                enable: true,
                                force: 60,
                                smooth: 10,
                            } as any,
                        },
                        number: {
                            density: { enable: true, area: 800 } as any,
                            value: 100,
                        },
                        opacity: {
                            value: { min: 0.1, max: 0.4 },
                            animation: {
                                enable: true,
                                speed: 0.5,
                                sync: false,
                            },
                        },
                        shape: { type: 'circle' },
                        size: {
                            value: { min: 1, max: 3 },
                            animation: {
                                enable: true,
                                speed: 2,
                                sync: false,
                            },
                        },
                    },
                    detectRetina: true,
                } as any
            }
        />
    );
}
