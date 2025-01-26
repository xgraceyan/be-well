from typing import Union

from fastapi import FastAPI, File, UploadFile, Form
import base64
from google.cloud import vision
import logging

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post('/image')
async def image_recog(
    uploaded_image: str = Form(),
):
    print("hello")
    image_data = base64.b64decode(uploaded_image)

    # encoded_image = base64.b64encode(image_data).decode('utf-8')

    client = vision.ImageAnnotatorClient()

    image = vision.Image(content=image_data)

    objects = client.object_localization(image=image).localized_object_annotations

    detected_objects = [obj.name for obj in objects]
    
    logger.debug("test outside of loop")

    valid_words = ['medicine', 'pill', 'liquid', 'bottle', 'bottled', 'capsule', 'jar', 'jarred']

    for obj in detected_objects:
        logger.debug(obj)
        if obj.lower() in valid_words:
            return {'detected': True}
        
        for word in valid_words:
            if word in obj.lower():
                return {'detected': True}

    return {'detected': False}
