import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  isActiveTab?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  link,
  isActiveTab = false,
}: ProjectCardProps) {
  return (
    <div className='border border-gray-800 rounded-xl overflow-hidden hover:bg-gray-900 transition-colors'>
      <Link href={link} className='flex flex-col sm:flex-row'>
        <div className='w-full h-48 sm:w-48 relative flex-shrink-0'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover'
            priority={isActiveTab}
          />
        </div>
        <div className='p-4 sm:p-6 flex flex-col justify-center'>
          <h3 className='font-bold text-xl'>{title}</h3>
          <p className='text-gray-400 text-sm mt-2 line-clamp-3 sm:line-clamp-4'>
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
