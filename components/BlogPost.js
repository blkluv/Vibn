import Link from 'next/link'
import Date from './Date';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BlogPost = ({ title, date, year, description, slug }) => {
  const time = year + date
  return (
    <div className='w-full'>
      <Link
        href={`/writing/${slug}`}
        prefetch
        legacyBehavior
      >
        <a className='underline w-full'>{title}</a>
      </Link>

      <p className='my-2 text-sm opacity-50 flex flex-row'><span className='mr-1'>Published on</span> <Date dateString={time} /></p>

      <p className='mt-6 mb-4 serif opacity-80'>
        {description}
      </p>
    </div>
  );
};

export default BlogPost;