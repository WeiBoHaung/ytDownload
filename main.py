import sys ,os
import threading
import asyncio
import eel
if getattr(sys, 'frozen', False):
    project_Path = os.path.dirname(sys.executable)
elif __file__:
    project_Path = os.path.dirname(__file__)
from module.ytDownload import download as dw
from module.ytDownload import getTitle as gt


@eel.expose 
def download(dwID,webURL,fileName,fileType):  
    # threading.Thread(target = dw(webURL,fileName,project_Path,fileType,dwID))    
    dw(webURL,fileName,project_Path,fileType,dwID)

@eel.expose
def getTitle(index,webURL):
    gt(index,webURL)
    

eel.init('web')
eel.start('main.html',size = (1280,960))

