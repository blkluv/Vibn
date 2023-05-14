import moment from 'moment';
import Link from 'next/link'
import { useState } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BlogPost = ({ title, date, year, slug, onMouseEnter, onMouseLeave }) => {
  const [isHover, setIsHover] = useState('false')
  const time = year + date;
  return (
    <Link
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={`/writing/${slug}`}
      prefetch
    >
      <button
        onMouseEnter={() => setIsHover('true')}
        onMouseLeave={() => setIsHover('false')}
        className={cn
          ('w-full py-4 flex flex-row justify-between',
            isHover === 'true' ? 'text-zinc-700' : ''
          )}
      >
        <span className='opacity-100 text-left'>{title}</span>
        <time className='mt-0.5 text-sm'>{moment(time).format('MM/DD')}</time>
      </button>
    </Link>
  );
};

export default BlogPost;