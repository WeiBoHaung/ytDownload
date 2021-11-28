
function submit_click(index) {
    if (check_input(index)) {
        cell_py(index);
    }
};
/**
 * 
 * @param {Int8Array} index 第幾項  
 * @returns 
 */
function check_input(index) {
    const thisForm = document.forms[index];
    dwID = thisForm.id.slice(4, 5)
    webRUL = thisForm.elements['webURL'].value;
    fileName = thisForm.elements['fileName'].value;
    fileType = thisForm.elements['type'].value;
    if (webURL == '' || fileName == '' || fileType == '') {
        document.getElementById('floatingTextarea').innerHTML += '錯誤!!! 第' + dwID + '項，' + '請確認檔名、網址、格式，不能為空\n';
        // console.log('error')
        return 0
    } else {
        // console.log(webRUL,fileName,fileType)
        return 1
    }
}
/**
 * 呼叫py的download函式
 * @param {Int8Array} index 第幾項 
 */
async function cell_py(index) {
    const thisForm = document.forms[index];
    dwID = thisForm.id.slice(4, 5);
    webRUL = thisForm.elements['webURL'].value;
    fileName = thisForm.elements['fileName'].value;
    fileType = thisForm.elements['type'].value;
    thisForm.elements['submit'].innerHTML = '下載中...';
    thisForm.elements['disBtn'].disabled = true;
    await eel.download(dwID, webRUL, fileName, fileType)();

}


eel.expose(updateUI)
/**
 * 收到資料更新ui
 * @param {string} dwID 下載項目
 * @param {String} message 下載結果
 */
function updateUI(dwID, message){
    console.log(dwID,message);
    index=parseInt(dwID, 10)-1;
    const thisForm = document.forms[index];
    document.getElementById('floatingTextarea').innerHTML += '第' + dwID + '項，' + message + '\n';
    thisForm.elements['submit'].innerHTML = '下載'
    thisForm.elements['disBtn'].disabled = false;
    thisForm.elements['webURL'].value = '';
    thisForm.elements['fileName'].value = '';
}



eel.expose(BarUpdate)
/**
 * 更新進度條
 * @param {string} title 檔案名稱
 * @param {string} liveprogress 目前進度
 */
function BarUpdate(title, liveprogress) {
    console.log(title, liveprogress);

    allForm = document.getElementsByTagName('form');
    let index = -1
    for (let i = 0; i < 9; i++) {
        inputTag = allForm[i].getElementsByTagName('input');
        fileName = inputTag[1].value;
        if (fileName == title) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        fieldsetTag = allForm[index].elements['disBtn'];
        tempTag = fieldsetTag.nextElementSibling;
        progressBar = tempTag.childNodes;
        progressBar[1].innerHTML = liveprogress + '%';
        progressBar[1].style.width = liveprogress + '%';
        if (liveprogress == 100) {
            progressBar[1].innerHTML = '0%';
            progressBar[1].style.width = '0%';
        }
    }
}

/**
 * 取得標題名稱，並自動填入檔案名稱。
 * @param {Int8Array} index 第幾項 
 */
async function getTitle(index) {
    const thisForm = document.forms[index];
    if (thisForm.elements['fileName'].value == '') {
        webRUL = thisForm.elements['webURL'].value;
        await eel.getTitle(index,webRUL)();
    }
}

eel.expose(updateTitle)
/**
 * 填入影片標題
 * @param {Int8Array} index 第幾項 
 * @param {string} title 影片標題
 */
function updateTitle(index,title){
    const thisForm = document.forms[index];
    if (thisForm.elements['fileName'].value == '') {
        thisForm.elements['fileName'].value = title;
    }    
}