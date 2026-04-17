from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import os
from ingest import process_document

app = FastAPI(title="mybooklm API")

# Store the global index temporarily (in production, use a persistent DB)
global_index = None 

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    global global_index
    
    # Save the uploaded file temporarily
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # Process and index the document
        global_index = process_document(temp_file_path)
        return {"status": "success", "message": f"{file.filename} processed successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@app.post("/api/query")
async def query_document(question: str):
    global global_index
    if not global_index:
        raise HTTPException(status_code=400, detail="No documents indexed yet.")
        
    # Query the RAG engine
    query_engine = global_index.as_query_engine(similarity_top_k=5)
    response = query_engine.query(question)
    
    # Return the answer and the exact source nodes (citations)
    return {
        "answer": response.response,
        "citations": [node.node.text for node in response.source_nodes]
    }
