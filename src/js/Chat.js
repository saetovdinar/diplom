import ChatApi from "./ChatApi";



export default class Chat {
    constructor(container) {
        //контейнер приложения
        this.container = container;
        //кнопка отпарвка сообщений
        this.submitBtn = document.querySelector('.submit');
        //инпут чата
        this.text = document.querySelector('.input');
        //контейнер чат
        this.chat = document.querySelector('.chat');
        //кнопка загрузки файлов с компьютера
        this.fileLoadBtn = document.querySelector('.overlap');
        this.fileLoad = document.querySelector('.file_load');
        //кнопка старта и финиша видеозаписи
        this.recordVideoBtn = document.querySelector('.video_record');
        this.stopVideoBtn = document.querySelector('.video_stop');
        //кнопка старта и финиша аудиозаписи
        this.recordAudioBtn = document.querySelector('.audio_record');
        this.stopAudioBtn = document.querySelector('.audio_stop');
        //регистрация всех событий
        this.eventRegister();

        //фиксация url 
        this.api = new ChatApi('http://localhost:7070')
        //отрисовка сообщений из БД
        this.renderChatStorage();

       
    }

    //реализует одноименную функцию.
    DragNDrop() {
        this.container.addEventListener('dragover', (event) => {
          event.preventDefault();  
        })
        this.container.addEventListener('drop', (event) => {
            event.preventDefault(); 
            //данные файла
            const file = event.dataTransfer.files && event.dataTransfer.files[0];
            //перемещение данных во временное хранилище и генерация URL
            const url = URL.createObjectURL(file);
            let contentCont;
            //создание контейнеров для медиа
            if(file.type.indexOf('image') != -1) {
                contentCont = document.createElement('img');
                contentCont.classList.add('content_cont');
                contentCont.src = url;
                    
            }
            if(file.type.indexOf('video') != -1) {
                contentCont = document.createElement('video');
                contentCont.classList.add('content_cont');
                contentCont.src = url;
                contentCont.controls = true;
            }
            if(file.type.indexOf('audio') != -1) {
                contentCont = document.createElement('audio');
                contentCont.classList.add('content_cont');
                contentCont.src = url;
                contentCont.controls = true;
            }
            //добавление их в чат
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(contentCont);
            this.chat.append(postCont)
                
            
           
          })
    }
    // релизует ленивую загрузку.
    lazyLoad() {
        this.chat.addEventListener('scroll' , () => {
            //проверка границы скрола пользователем
            if(this.chat.scrollTop === 0) {
                //отрисовка 10 сообщение при достижении верхней границы чата
                this.api.getChat()
                .then(data => {
                    data.forEach(msg => {
               
                        //проверка наличия медиа-ссылок в сообщении
                        if(msg.message.indexOf('http') != -1 && msg.message.indexOf('blob') != -1) {
                            let contentCont;
                            if(msg.type === 'image') {
                                contentCont = document.createElement('img');
                                contentCont.src = msg.message;
                                
                            }
                            if(msg.type === 'video') {
                                contentCont = document.createElement('video');
                                contentCont.src = msg.message;
                                contentCont.controls = true;
                            }
                            if(msg.type === 'audio') {
                                contentCont = document.createElement('audio');
                                contentCont.src = msg.message;
                                contentCont.controls = true;
                            }
                            const postCont = document.createElement('div');
                            postCont.classList.add('post_cont');
                            postCont.append(contentCont);
                            this.chat.prepend(postCont)
                            return;
                        }
        
                        //проверка наличия ссылок в сообщении
                        if(msg.message.indexOf('http') != -1) {
                            const linkTag = document.createElement('a');
                            linkTag.href = msg.message;
                            linkTag.append(msg.message);
                            const postCont = document.createElement('div');
                            postCont.classList.add('post_cont');
                            postCont.append(linkTag);
                            this.chat.prepend(postCont)
                            return;
                        }
                        //добавление сообщения в чат
                        const postCont = document.createElement('div');
                        postCont.classList.add('post_cont');
                        postCont.append(msg.message);
                        this.chat.prepend(postCont)
                    })
                   
                })
            }
        })
       
       
       
    }
    //рендер сообщений из БД.
    renderChatStorage() {
        //запрос истории чата
        this.api.getChat()
        .then(data => {
            data.forEach(msg => {
       
                //проверка наличия медиа-ссылок в сообщениика
                if(msg.message.indexOf('http') != -1 && msg.message.indexOf('blob') != -1) {
                    let contentCont;
                    if(msg.type === 'image') {
                        contentCont = document.createElement('img');
                        contentCont.src = msg.message;
                        
                    }
                    if(msg.type === 'video') {
                        contentCont = document.createElement('video');
                        contentCont.src = msg.message;
                        contentCont.controls = true;
                    }
                    if(msg.type === 'audio') {
                        contentCont = document.createElement('audio');
                        contentCont.src = msg.message;
                        contentCont.controls = true;
                    }
                    const postCont = document.createElement('div');
                    postCont.classList.add('post_cont');
                    postCont.append(contentCont);
                    this.chat.prepend(postCont)
                    return;
                }

                //проверка наличия ссылок в сообщении
                if(msg.message.indexOf('http') != -1) {
                    const linkTag = document.createElement('a');
                    linkTag.href = msg.message;
                    linkTag.append(msg.message);
                    const postCont = document.createElement('div');
                    postCont.classList.add('post_cont');
                    postCont.append(linkTag);
                    this.chat.prepend(postCont)
                    return;
                }
                //добавление в чат
                const postCont = document.createElement('div');
                postCont.classList.add('post_cont');
                postCont.append(msg.message);
                this.chat.prepend(postCont)
            })
            //смещение скролла на высоту сообщения
            this.chat.scrollTop += this.chat.scrollHeight;
        })
    }

    //отправка геолокации.
    postGeo(postCont) {
        //добавление геопозиции к сообщению
        const geoCont = document.createElement('div');
        geoCont.classList.add('geo_cont');
        navigator.geolocation.getCurrentPosition((data) => {
            const {latitude, longitude} = data.coords;
            geoCont.append(`[${latitude}, ${longitude}]`)
            postCont.append(geoCont);
           data.coords
        })
        
        
    }
    //контейнер для всех собтий.
    eventRegister() {
        this.videoPost();
        this.audioPost();
        this.textPost();
        this.loadFile();
        this.lazyLoad();
        this.DragNDrop();
    }
    //загрузка файлов, реализация скачивания фалов на компьютер и с компьютера и отправка в БД.
    loadFile() {
        //отслживание загрузки файла в чат
        this.fileLoad.addEventListener('change', (event) => {
   
            //получение данных
            const file = this.fileLoad.files && this.fileLoad.files[0];

            if(!file) return; 


            const body = new FormData();
            //перемещение данных во временное хранилище и генерация URL
            const url = URL.createObjectURL(file);

            
           
            let contentCont;
            //создание елемента узла соответсвенно типу медиа
            if(file.type.indexOf('image') != -1) {
                contentCont = document.createElement('img');
                contentCont.classList.add('content_cont');
                body.append('message', url);
                body.append('type', 'image');
            }
            if(file.type.indexOf('video') != -1) {
                contentCont = document.createElement('video');
                contentCont.classList.add('content_cont');
                contentCont.controls = true;
                body.append('message', url);
                body.append('type', 'video');
            }
            if(file.type.indexOf('audio') != -1) {
                contentCont = document.createElement('audio');
                contentCont.classList.add('content_cont');
                contentCont.controls = true;
                body.append('message', url);
                body.append('type', 'audio');
            }
            contentCont.src = url;

           
            //отправка сообщения в БД
            this.api.add(body)
            
           
            //отрисовка в чат
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            //генерация кнопки загрузки файла на компьютер
            const downloadBtn = document.createElement('div');
            downloadBtn.classList.add('download_btn');

            downloadBtn.innerHTML = '&#129095';
            downloadBtn.addEventListener('click', (event) => {
                const link = document.createElement('a');
                link.href = url;
                link.rel = 'noopener';
                link.download = file.name;
                link.click();
            });
            this.currentPost = postCont;
            this.postGeo(this.currentPost);
           
            postCont.append(contentCont)
            postCont.append(downloadBtn)
            this.chat.append(postCont)
            
    }
       

    )}
    // создание, настройка узлов - элементов для проигрывателей в браузере
    createPLayer(type) {

        const player = document.createElement(type);
        player.classList.add(type);
        player.setAttribute('controls', 'controls');
    
        const postCont = document.createElement('div');
        postCont.classList.add('post_cont');
    
        postCont.append(player);

        return [postCont, player];
    }
    //запись медиа потока.
    recorder(media, chunk, player) {
                const recorder = new MediaRecorder(media);
                
    
               
              
                recorder.addEventListener('dataavailable', (event) => {
                    chunk.push(event.data)
                });
                recorder.addEventListener('stop', () => {
                    const blob = new Blob(chunk)
                   
                    player.src = URL.createObjectURL(blob);
                   
                });
                recorder.start();
                return recorder;
    }
    //создание элемента кнопки скачивания на компьютер медиа файлов.
    createDownloadBtn(chunk, format) {
            const downloadBtn = document.createElement('div');
            downloadBtn.classList.add('download_btn');
    
            downloadBtn.innerHTML = '&#129095';
    
    
            downloadBtn.addEventListener('click', (event) => {
                const blob = new Blob(chunk)
       
           
                const link = document.createElement('a');
                link.href =  URL.createObjectURL(blob);;
                link.rel = 'noopener';
                link.download = format;
                link.click();
            
            });
            return downloadBtn;
    }
    //событие старта и финиша записи видео и отправка в чат и БД.
    videoPost() {
            
            
        this.recordVideoBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            //изменение иконки старта/финиша записи
            this.recordVideoBtn.style.display = 'none';
            this.stopVideoBtn.style.display = 'block';
            //запрос на запись онлайн
            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
        });
            
            const [postCont, player] = this.createPLayer('video');
            
          
           
            this.currentPost = postCont;
            //геолокация
            this.postGeo(this.currentPost);
            //массив для данных записи
            const chunk = [];
            const record = this.recorder(media, chunk,player);
            //кнопка скачивания
            const downloadBtn = this.createDownloadBtn(chunk, 'video.mp4');

            postCont.append(downloadBtn);
            this.chat.append(postCont);
            //смещение скролла на высоту сообщения
            this.chat.scrollTop += postCont.offsetHeight ;
           //финиш записи
            this.stopVideoBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                 //изменение иконки старта/финиша записи
                this.recordVideoBtn.style.display = 'block';
                this.stopVideoBtn.style.display = 'none';
                record.stop();
                media.getTracks().forEach(track => track.stop());
       
            })
    })
    }
    //событие старта и финиша записи аудио и отправка в чат и БД.
    audioPost() {
        
       
       
        this.recordAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            this.recordAudioBtn.style.display = 'none';
            this.stopAudioBtn.style.display = 'block';

            const media = await navigator.mediaDevices.getUserMedia({
                audio: true,
        });


        const [postCont, player] = this.createPLayer('audio');
            
          
           
            this.currentPost = postCont;

            this.postGeo(this.currentPost);

            const chunk = [];
            const record = this.recorder(media, chunk, player);

            const downloadBtn = this.createDownloadBtn(chunk, 'audio.mp3');

            postCont.append(downloadBtn);
            this.chat.append(postCont);
            
            this.chat.scrollTop += postCont.offsetHeight ;



    

        this.stopAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            this.recordAudioBtn.style.display = 'block';
            this.stopAudioBtn.style.display = 'none';

            record.stop();
            media.getTracks().forEach(track => track.stop());
           
       
        })
    })
    }
    //отправка текстовых сообщений в чат и БД

    textPost() {
      
       
        this.submitBtn.addEventListener('click', async (event) => {
            event.preventDefault(); 

            const textValue = this.text.value;
            //проверка на команду для отправки погоды
            if(textValue.indexOf('@weather') != -1) {
                
            
              
                this.api.getWeather()
                .then((weather) => {
                    const postCont = document.createElement('div');
                    postCont.classList.add('post_cont');

                    const random = Math.floor(Math.random() * 5);
                    postCont.append(weather[random]);
                    this.chat.append(postCont);
                    
                    this.chat.scrollTop += postCont.offsetHeight 
                    this.currentPost = postCont;
                    this.text.value = '';
                        
                   
                });
                return;
              
            }
            //проверка на команду для отправки уведомлений и напоминаний
            //формат ввода данных строго: @schedule: 2024-08-12 10:46 «Последний день лета»

            if(textValue.indexOf('@schedule') != -1) {
                //разбор строки по пробелам
                const inputSlice = textValue.split(' ');
                let [shedule,  day, time, ...text] = inputSlice;
                //текущее время
                const currentDate = Date.now();
                //перевод будущей даты в ms
                const appDate =  Date.parse(day + 'T' + time);
                const textForNoti = text.join(' ');
                function  showNoti() {
                 new Notification(textForNoti);  
               }
               //таймер на уведомление по разнице времени
               setTimeout(showNoti, appDate-currentDate );
                
               
                this.text.value = '';
                return;
              
            }
           //отправка сообщения в БД
            const body = new FormData();
            body.append('message', textValue);
            body.append('type', 'text');
            this.api.add(body)
            
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(textValue);
            this.chat.append(postCont);
            //смещение скролла на высоту сообщения
            this.chat.scrollTop += postCont.offsetHeight 
      
           
            this.currentPost = postCont;
            this.text.value = '';
        });
    };
        
    
}