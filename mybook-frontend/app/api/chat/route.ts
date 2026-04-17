import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const latestMessage = messages[messages.length - 1].content;

  try {
    // 1. Fetch the relevant document chunks from your Python backend
    // (Assuming FastAPI is running on localhost:8000)
    const ragResponse = await fetch(`http://localhost:8000/api/query?question=${encodeURIComponent(latestMessage)}`, {
      method: 'POST',
    });
    
    if (!ragResponse.ok) {
      throw new Error('Failed to fetch context from Python backend');
    }
    
    const ragData = await ragResponse.json();

    // 2. Construct a system prompt grounded in the retrieved citations
    // Map the new structured citations from the backend
    const citationText = ragData.citations.map((c: any) => `[Source ${c.id}, Page ${c.page}]:\n${c.text}`).join('\n\n---\n\n');

    const systemPrompt = `You are mybooklm, an expert research assistant. 
    Answer the user's question based strictly on the following context retrieved from their documents.
    Always cite your sources using bracketed markdown links pointing to the source ID like this: [[1]](#page-5) (where 1 is the Source ID and 5 is the matched Page number).
    If the answer is not in the context, state that you do not know.
    
    Context:
    ${citationText}`;

    // 3. Stream the response directly to the frontend using the AI SDK
    const result = await streamText({
      model: google('gemini-1.5-pro'),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Backend connection failed." }), { status: 500 });
  }
}
