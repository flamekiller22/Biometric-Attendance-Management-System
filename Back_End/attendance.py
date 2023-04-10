import time
import fingerprint
import serial

import cv2

import requests

class_id = input('Enter class id: ')

uart = serial.Serial("/dev/tty.usbserial-0001", baudrate=57600, timeout=1)

finger = fingerprint.fingerprint(uart)

##################################################

def get_fingerprint():
    """Get a finger print image, template it, and see if it matches!"""
    print("Waiting for image...")
    while finger.get_image() != fingerprint.OK:
        pass
    print("Templating...")
    if finger.image_2_tz(1) != fingerprint.OK:
        return False
    print("Searching...")
    if finger.finger_search() != fingerprint.OK:
        return False
    return True

####################################################

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
            id=43
        cv2.putText(img,str(id),(x,y+h),font, 1.5, (0, 0, 255), thickness=3)
    cv2.imshow('img', img)
    if cv2.waitKey(1) == ord('q'):
        break
    if time.time() > timeout:
        break
print(id)
cap.release()
cv2.destroyAllWindows()

##################################################

print('Face ID:', id)

if get_fingerprint():
    print("Detected #", finger.finger_id, "with confidence", finger.confidence)


if (finger.finger_id == int(id)):
    res = requests.get(f'http://localhost:3000/api/attendedClass?classid={class_id}&attended=1&rollno=21BCY10043')
    print(res)
else:
    res = requests.get(f'http://localhost:3000/api/attendedClass?classid={class_id}&attended=0&rollno=21BCY10043')
    print(res)
