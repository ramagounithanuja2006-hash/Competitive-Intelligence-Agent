import os
HINDSIGHT_API_KEY=os.getenv("HINDSIGHT_API_KEY","")
def status(): return {"configured":bool(HINDSIGHT_API_KEY)}
