# mybooklm

**mybooklm** is a localized, full-stack open-source implementation inspired by NotebookLM. It allows researchers and curious minds to deeply interact with thick PDF documents, chunking them down by semantic relationships rather than arbitrary limits, and answering complex queries using state-of-the-art generation visually deep-linked to the exact source pages.

## Features

- **Semantic Document Chunking**: Powered by `LlamaParse` and `LlamaIndex`'s `SemanticSplitterNodeParser`. Your documents are not just split by character limits, but grouped natively by semantic context relationships ensuring much higher retrieval quality.
- **Deep-Linked Citations**: Gemini is instructed to stream contextually mapped markdown links. Our customized Chat UI catches these markdown anchors and styles them into interactive chips. When clicked, the dynamic Document Viewer immediately jumps to the active target context.
- **Vercel AI SDK Streaming**: Rapid token streaming out-of-the-box leveraging `@ai-sdk/google` powered by `gemini-1.5-pro` for enormous context windows.
- **Dual Panel UI architecture**: A responsive Next.js workspace consisting of a bespoke React PDF Object Viewer parallel to an asynchronous document query interface.

## Tech Stack

### Frontend (`mybook-frontend`)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI/Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React (`useChat` via [Vercel AI SDK](https://sdk.vercel.ai/docs))
- **Markdown Handling**: `react-markdown`

### Backend (`mybook-backend`)
- **Server Framework**: [FastAPI](https://fastapi.tiangolo.com/) (uvicorn)
- **RAG Engine**: [LlamaIndex](https://www.llamaindex.ai/) & `LlamaParse`
- **Embeddings**: `BAAI/bge-small-en-v1.5` (Free Local HuggingFace Embeddings for limitless context vectors).

---

## Running the Application

This repository requires both the Frontend and the Backend to be run concurrently. The frontend connects to your local FastAPI backend on port `8000`.

### 1. Backend Setup

```bash
cd mybook-backend

# 1. Initialize your Virtual Environment
python -m venv venv
venv\Scripts\activate  # (Windows) or source venv/bin/activate (Mac/Linux)

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add your environment variables
# Copy .env.example to .env and input your LlamaCloud key.
```

Start the Uvicorn server:
```bash
python -m uvicorn main:app --reload
```

### 2. Frontend Setup

```bash
cd mybook-frontend

# 1. Install Node Modules
npm install

# 2. Add your Google Gemini Key
# Copy .env.example to .env.local and input your API Key
```

Start the Next.js frontend:
```bash
npm run dev
```

Finally, open your browser and navigate to `http://localhost:3000`.
