/*
* @Author: yankang
* @Date:   2019-10-27 18:28:01
* @Last Modified by:   yankang
* @Last Modified time: 2019-10-29 18:09:17
*/
const electron = require('electron')
const os = require('os')
const { shell } = electron

let push = document.querySelector('#push')
let offline = document.querySelector('#offline')
let online = document.querySelector('#online')
let reload = document.querySelector('#reload')
let btns = document.getElementsByTagName('button')
let len = btns.length
let btnPre = btns[0]

for(var i=0; i<len; ++i){
	btns[i].addEventListener('click', function(e){
		btnPre.classList.remove('active')
		btnPre = this
		this.classList.add('active')
	}, false)
}

reload.addEventListener('click', function(){
	console.log(1)
	location.reload()
})

window.addEventListener('offline', function(){
	console.log('offline')
})
window.addEventListener('online', function(){
	console.log('online')
})

// var message = function(){
//     const {dialog} = require('electron').remote

//     return dialog.showMessageBox({
//         title:"是否联网",
//         message:"是?",
//         type:'warning',
//         buttons:["取消","确定"],
//         defaultId: 0
//     },function(index){
//         if(index == 0){
//             console.log(index)
//         }
//     })
// }

// message()
