# RAG Chat App with LlamaIndex.js

**A chat agent that uses the RAG model to answer questions.**

## Setup

### Installation

- Run `npm install` in the root directory
- cd into `frontend` and run `npm install`
- Rename `.env.example` to `.env` and fill in the necessary information

### Express.js Backend

- Run `npm run backend`

### React.js Frontend

- cd into `frontend`
- Run `npm run frontend`

### RAG examples

- cd into `_rag-examples`
- Run `node [FILENAME]`

## Features

- [x] Index documents and store embeddings locally
- [x] Chat interface
- [x] Stream LLM output from backend to frontend
- [x] Connect to a local LLM (Ollama)
- [ ] Add chat history
- [ ] Set up custom instructions
- [ ] Integrate Llama Parse
- [ ] Use free embeddings
- [ ] Optimize chunk sizing
