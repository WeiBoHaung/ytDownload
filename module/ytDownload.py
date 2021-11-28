import os
import time 
from pytube import YouTube, Playlist
from pytube.cli import on_progress 
import eel


def setURL(webURL):
    try:
        yt = YouTube(webURL)
        return yt
    except:
        return 0

def download(webURL,filename,project_Path,fileType,dwID):
    yt=setURL(webURL)
    if yt==0:
        eel.updateUI(dwID,'網址輸入錯誤')
    yt.title=filename
    yt.register_on_progress_callback(onProgress)

    try:
        if fileType=='mp4':
            yt.streams.get_highest_resolution().download(filename=f"{filename}.mp4",output_path=project_Path)
            message='下載完成'
        else:
            yt.streams.get_audio_only().download(filename=f"{filename}.mp3",output_path=project_Path)
            message='下載完成'         
    except Exception as e:
        print(e)
        message='下載失敗'
        
    eel.updateUI(dwID,message)

def getTitle(index,webURL):
    yt=setURL(webURL)
    if yt==0:
        eel.updateTitle(index,'網址輸入錯誤')
    eel.updateTitle(index,yt.title)

    

def onProgress(stream, chunk, remains):
    total = stream.filesize
    percent = (total-remains) / total * 100
    eel.BarUpdate(stream.title,int(percent))
    print('下載中… {:05.2f}%'.format(percent), end='\r')



                
if __name__ == '__main__':
    # link=input('enter url:')
    # yt=YouTube(link,on_progress_callback=on_progress)
    # videos=yt.streams.first()
    # videos.download()
    # print("(:")
    download('https://www.youtube.com/watch?v=SITSupW5Q2Y','testfile','./','mp4')
    # getTitle('https://www.youtube.com/watch?v=x-mQDWMAnb8')
    