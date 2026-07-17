'use client';

import { useEffect, useState } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TocNavProps {
    headings: Heading[];
}

export default function TocNav({ headings }: TocNavProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-nav" aria-label="Índice do artigo">
            <div className="post-side-label">Nesta análise</div>
            <ol className="toc-list">
                {headings.map(({ id, text, level }) => {
                    const className = [
                        activeId === id ? 'active' : '',
                        level === 3 ? 'sub' : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <li key={id}>
                            <a href={'#' + id} className={className}>
                                {text}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}