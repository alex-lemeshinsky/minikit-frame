import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json();
    
    // Get the joke data from the URL
    const url = new URL(request.url);
    const dataParam = url.searchParams.get('data');
    const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;

    // Return the frame with the joke
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="/og-image.png" />
          <meta property="og:image" content="/og-image.png" />
          <meta property="fc:frame:button:1" content="View Joke" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/frame/action?data=${encodeURIComponent(dataParam || '')}" />
        </head>
        <body>
          <div>
            <h1>${data?.title}</h1>
            <p>${data?.content}</p>
          </div>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error handling frame action:', error);
    return new NextResponse('Error processing frame action', { status: 500 });
  }
} 