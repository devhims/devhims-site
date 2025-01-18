import { cn } from '@/lib/utils';
import Image from 'next/image';

function BulletPoints({ text }: { text: string }) {
  // Split the text into individual bullet points
  const points = text
    .trim()
    .split('\n')
    .filter((point) => point.trim())
    .map((point) => point.trim());

  return (
    <div className='space-y-2'>
      {points.map((point, index) => (
        <div key={index} className='flex gap-2 text-gray-200'>
          <span className='flex-shrink-0'>•</span>
          <span className='flex-1 leading-snug'>
            {point.replace('•', '').trim()}
          </span>
        </div>
      ))}
    </div>
  );
}

export interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  skills?: string[];
  isLast?: boolean;
  logo?: string;
  isActiveTab?: boolean;
}

function TimelineItem({
  date,
  title,
  company,
  description,
  skills,
  isLast,
  logo,
  isActiveTab,
}: TimelineItemProps) {
  return (
    <div className='relative flex gap-6 pb-8 group'>
      {/* Timeline line */}
      <div
        className="
          absolute left-[24px] top-[50px] h-[calc(100%-40px)] w-[2px]
          bg-gray-700/50 overflow-hidden
          before:content-[''] before:absolute before:left-0 before:top-0
          before:w-[30px] before:h-[20px] before:border-b-2 before:border-gray-700/50
          before:group-hover:border-blue-400 before:rounded-bl-xl
          after:content-[''] after:absolute after:inset-0
          after:bg-gradient-to-b after:from-blue-400 after:to-blue-400
          after:-translate-y-full after:group-hover:translate-y-0
          after:transition-transform after:duration-300 after:ease-in-out
          z-0
        "
        style={{ bottom: isLast ? '50%' : '0' }}
      />

      {/* Timeline dot with logo */}
      <div className='relative z-10'>
        <div
          className='
       w-12 h-12 rounded-full border-2 border-gray-700/50 bg-gray-900
    group-hover:border-blue-500/50 group-hover:bg-blue-500/10
    transition-colors overflow-hidden
          '
        >
          {logo ? (
            <Image
              src={logo}
              alt={company}
              width={32}
              height={32}
              className='w-12 h-12 object-cover object-center'
              style={{
                width: '100%',
                height: '100%',
              }}
              priority={isActiveTab}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-500 font-medium'>
              {company.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 space-y-2'>
        <div className='space-y-1/2'>
          <div className='text-sm text-gray-500 font-mono'>{date}</div>
          <div className='flex flex-col  sm:flex-row sm:items-baseline gap-1 sm:gap-2'>
            <h3 className='font-semibold text-lg text-white'>{title}</h3>
            <span className='hidden sm:inline text-gray-500'>•</span>
            <span className='text-gray-400 font-bold'>{company}</span>
          </div>
        </div>
        <div className='leading-relaxed'>
          <BulletPoints text={description} />
        </div>
        {skills && skills.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-2'>
            {skills.map((skill) => (
              <span
                key={skill}
                className='px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300'
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TimelineProps {
  className?: string;
  items: Array<Omit<TimelineItemProps, 'isLast'>>;
  isActiveTab?: boolean;
}

export function Timeline({ className, items, isActiveTab }: TimelineProps) {
  return (
    <div className={cn('space-y-4 mb-16', className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          logo={item.logo || '/globe.svg'}
          isLast={index === items.length - 1}
          isActiveTab={isActiveTab}
        />
      ))}
    </div>
  );
}
