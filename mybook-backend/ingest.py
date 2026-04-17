import os
from dotenv import load_dotenv
from llama_parse import LlamaParse
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.core.node_parser import SemanticSplitterNodeParser
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# Load environment variables (API keys)
load_dotenv()

# We use an advanced local embedding model to completely bypass OpenAI quotas
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
Settings.embed_model = embed_model

def process_document(file_path: str):
    """
    Parses a complex PDF, chunks it semantically, and indexes it.
    """
    print(f"Parsing document: {file_path}...")
    
    # 1. Initialize LlamaParse for high-fidelity extraction
    # It turns complex PDFs into clean Markdown, preserving tables and structure
    parser = LlamaParse(result_type="markdown")
    file_extractor = {".pdf": parser}
    
    # 2. Read the document
    documents = SimpleDirectoryReader(
        input_files=[file_path], 
        file_extractor=file_extractor
    ).load_data()
    
    # 3. Semantic Chunking
    # Instead of splitting every 500 characters, we split based on meaning.
    # This keeps related concepts together, drastically improving the AI's answers.
    splitter = SemanticSplitterNodeParser(
        buffer_size=1, breakpoint_percentile_threshold=95, embed_model=embed_model
    )
    nodes = splitter.get_nodes_from_documents(documents)
    
    # 4. Create the Vector Index (For now, we build it in memory)
    # In production, this will be swapped to pgvector (PostgreSQL)
    index = VectorStoreIndex(nodes)
    
    print(f"Successfully processed and indexed {len(nodes)} semantic chunks.")
    return index

if __name__ == "__main__":
    # Test the pipeline with a sample PDF
    # Make sure you have a 'sample.pdf' in the same directory
    test_index = process_document("sample.pdf")
