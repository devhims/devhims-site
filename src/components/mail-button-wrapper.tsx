'use client';

import { useSearchParams } from 'next/navigation';

export default function MailButtonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'contact');
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return <button onClick={handleClick}>{children}</button>;
}
