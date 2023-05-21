import moment from 'moment';
import Link from 'next/link'
import { useState } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BlogPost = ({ title, date, year, img, description, slug}) => {

  const time = year + date;
  return (
    <Link
      href={`/writing/${slug}`}
      prefetch
    >
      <button
        className={cn
          ('w-full py-4 flex flex-col justify-between',
          )}
      >
        <img src={img} />
        <h1 className='opacity-100 text-black blog-spacing text-left text-3xl md:text-4xl sm:text-5xl inter font-semibold'>{title}</h1>
        <time className='mt-1'>Published on {moment(time).format('MMMM DD')}</time>
        <p className='text-left text-base md:text-lg sm:text-lg'>
          {description}
        </p>
      </button>
    </Link>
  );
};

export default BlogPost;