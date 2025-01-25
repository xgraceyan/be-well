from typing import Union

from fastapi import FastAPI, File, UploadFile
import base64
from google.cloud import vision
import logging

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post('/image-recog')
async def _image_recog(
    uploaded_image: UploadFile = File(...),
):
    image_data = await uploaded_image.read()

    encoded_image = base64.b64encode(image_data).decode('utf-8')

    client = vision.ImageAnnotatorClient()

    image = vision.Image(content=image_data)

    objects = client.object_localization(image=image).localized_object_annotations

    detected_objects = [obj.name for obj in objects]
    
    logger.debug("test outside of loop")

    for obj in detected_objects:
        logger.debug(obj)
        if obj.lower() in ['medicine', 'pill', 'liquid'] or 'bottle' in obj.lower():
            return {'detected': True}

    return {'detected': False}
