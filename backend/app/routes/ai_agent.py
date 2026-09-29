from fastapi import APIRouter
router=APIRouter(prefix="/ai-agent",tags=["AI Agent"])
@router.post("/chat")
def chat(): return {"message":"AI agent endpoint ready"}