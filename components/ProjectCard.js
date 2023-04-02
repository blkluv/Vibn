import Link from 'next/link'
import { useState } from 'react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const ProjectCard = ({ title, description, href,  onMouseEnter, onMouseLeave }) => {
    const [isHover, setIsHover] = useState('false')
    return (
        <Link
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            href={href}
        >
            <button
                onMouseEnter={() => setIsHover('true')}
                onMouseLeave={() => setIsHover('false')}
                className={cn
                    ('w-full py-3 flex flex-row justify-between border-b dark:border-b-zinc-800',
                        isHover === 'true' ? 'text-black dark:text-white' : ''
                    )}
            >
                <p>{title}</p>
                <time className='text-sm mt-0.5'>{description}</time>
            </button>
        </Link>
    );
};

export default ProjectCard;