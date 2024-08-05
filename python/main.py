from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any
from llm_query import LLM
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

class Query(BaseModel):
    llm: str
    question: str
    context: Any
@app.get("/")
async def listening():
    return 'LLM Chat Server is listening!'
@app.post("/query")
async def query_llm(query: Query):
    llm = LLM(query.llm)
    answer = llm.ask(question=query.question, context=query.context)
    return answer