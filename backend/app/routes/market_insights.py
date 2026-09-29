from fastapi import APIRouter
router=APIRouter(prefix="/market-insights",tags=["Market Insights"])
@router.get("/")
def insights(): return {"insights":[]}