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
        <a>{title}</a>
      </Link>

      <p className='text-lg my-2 opacity-50 flex flex-row'><span className='mr-1'>Published on</span> <Date dateString={time} /></p>
 
      <p className='text-xl mt-3 mb-4 opacity-75'>
        {description}
      </p>
    </div>
  );
};

export default BlogPost;