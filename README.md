###使用说明
本项目应用了两种常见的 PWA 的 service-worker 的使用方式进行测试:
原生 service-worker: 在根目录的 main.js 配置 mainWindow.loadURL('http://localhost:8888/sw.html')
workbox:在根目录的 main.js 配置 mainWindow.loadURL('http://localhost:9999/')
可以使用 http-server 或者 anywhere 对 static 文件夹运行本地项目, 注意对应上面两个端口。

###项目运行
npm install
npm run start
npm run estart

###打包成桌面程序
npm run pack
