
import numpy as np
import cv2
import time
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(1)
rec = cv2.face.LBPHFaceRecognizer_create()
rec.read("faceREC/trainingdata.yml")
id=0
conf=0
font=cv2.FONT_HERSHEY_SIMPLEX
timeout = time.time() + 5
while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.5, 5)
    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        id,conf=rec.predict(gray[y:y+h,x:x+w])  
        if(id==43):
            id="Bharath D 21BCY10043"
        cv2.putText(img,str(id),(x,y+h),font, 1.5, (0, 0, 255), thickness=3)
    cv2.imshow('img', img)
    if cv2.waitKey(1) == ord('q'):
        break
    if time.time() > timeout:
        break
print(id)
cap.release()
cv2.destroyAllWindows()