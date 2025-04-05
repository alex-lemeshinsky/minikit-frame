import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: { data?: string } }): Promise<Metadata> {
  const data = searchParams.data ? JSON.parse(decodeURIComponent(searchParams.data)) : null;
  
  return {
    title: data?.title || 'Joke Frame',
    openGraph: {
      title: data?.title || 'Joke Frame',
      images: [
        {
          url: '/og-image.png', // You'll need to create this image
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': '/og-image.png',
      'fc:frame:button:1': 'View Joke',
      'fc:frame:post_url': `${process.env.NEXT_PUBLIC_APP_URL}/frame/action`,
    },
  };
}

export default function FramePage({ searchParams }: { searchParams: { data?: string } }) {
  const data = searchParams.data ? JSON.parse(decodeURIComponent(searchParams.data)) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-2xl font-bold">{data?.title}</h1>
        <p className="text-lg">{data?.content}</p>
      </div>
    </div>
  );
} 