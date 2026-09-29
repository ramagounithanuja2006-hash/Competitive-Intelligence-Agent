from fastapi import APIRouter
router=APIRouter(prefix="/auth",tags=["Authentication"])
@router.post("/signup")
def signup(): return {"message":"Signup endpoint ready"}
@router.post("/login")
def login(): return {"message":"Login endpoint ready"}