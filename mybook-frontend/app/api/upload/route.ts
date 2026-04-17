import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Proxy the request to the Python backend to avoid browser CORS issues
    // and to encapsulate backend logic securely
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const backendResponse = await fetch('http://localhost:8000/api/upload', {
      method: 'POST',
      body: backendFormData,
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        { error: `Backend Server Error: ${errorText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload proxy error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file to backend." }, 
      { status: 500 }
    );
  }
}
