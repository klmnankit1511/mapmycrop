from pydantic import BaseModel, StrictFloat, StrictStr, StrictInt

class Temperature(BaseModel):
    latitude: StrictFloat
    longitude: StrictFloat
    start_date: StrictStr
    end_date: StrictStr
 