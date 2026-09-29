from fastapi import APIRouter
router=APIRouter(prefix="/competitors",tags=["Competitors"])
@router.get("/")
def competitors(): return {"competitors":[]}