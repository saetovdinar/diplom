import ChatApi from "./ChatApi";



export default class Chat {
    constructor(container) {
        this.container = container;
        
        this.submitBtn = document.querySelector('.submit');
        this.text = document.querySelector('.input');
        this.chat = document.querySelector('.chat');

        this.fileLoadBtn = document.querySelector('.overlap');
        this.fileLoad = document.querySelector('.file_load');
        
        this.eventRegister();

        this.api = new ChatApi('http://localhost:7070')

        this.renderChatStorage();
        this.lazyLoad();
        this.DragNDrop();
       
    }

    
    DragNDrop() {
        this.container.addEventListener('dragover', (event) => {
          event.preventDefault();  
        })
        this.container.addEventListener('drop', (event) => {
            event.preventDefault(); 
            const file = event.dataTransfer.files && event.dataTransfer.files[0];
            const url = URL.createObjectURL(file);
            let contentCont;
            if(file.type.indexOf('image') != -1) {
                contentCont = document.createElement('img');
                contentCont.src = url;
                    
            }
            if(file.type.indexOf('video') != -1) {
                contentCont = document.createElement('video');
                contentCont.src = url;
                contentCont.controls = true;
            }
            if(file.type.indexOf('audio') != -1) {
                contentCont = document.createElement('audio');
                contentCont.src = url;
                contentCont.controls = true;
            }
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(contentCont);
            this.chat.append(postCont)
                
            
           
          })
    }
    lazyLoad() {
        this.chat.addEventListener('scroll' , () => {
            
            if(this.chat.scrollTop === 0) {
               
                this.api.getChat()
                .then(data => {
                    data.forEach(msg => {
               
        
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
        
                        const postCont = document.createElement('div');
                        postCont.classList.add('post_cont');
                        postCont.append(msg.message);
                        this.chat.prepend(postCont)
                    })
                   
                })
            }
        })
       
       
       
    }
    renderChatStorage() {
        this.api.getChat()
        .then(data => {
            data.forEach(msg => {
       

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

                const postCont = document.createElement('div');
                postCont.classList.add('post_cont');
                postCont.append(msg.message);
                this.chat.prepend(postCont)
            })
            this.chat.scrollTop += this.chat.scrollHeight;
        })
    }
    eventRegister() {
        this.videoPost();
        this.audioPost();
        this.textPost();
        this.loadFile();
    }
    loadFile() {
        this.fileLoad.addEventListener('change', (event) => {
   
            
            const file = this.fileLoad.files && this.fileLoad.files[0];

            if(!file) return; 


            const body = new FormData();
           
            const url = URL.createObjectURL(file);

            
           
            let contentCont;

            if(file.type.indexOf('image') != -1) {
                contentCont = document.createElement('img');
                body.append('message', url);
                body.append('type', 'image');
            }
            if(file.type.indexOf('video') != -1) {
                contentCont = document.createElement('video');
                contentCont.controls = true;
                body.append('message', url);
                body.append('type', 'video');
            }
            if(file.type.indexOf('audio') != -1) {
                contentCont = document.createElement('audio');
                contentCont.controls = true;
                body.append('message', url);
                body.append('type', 'audio');
            }
            contentCont.src = url;

           

            this.api.add(body)
            
           
           
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            
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
            
           
            postCont.append(contentCont)
            postCont.append(downloadBtn)
            this.chat.append(postCont)
            
    }
       

    )}

    videoPost() {
        const recordVideoBtn = document.querySelector('.video_record');
        const stopVideoBtn = document.querySelector('.video_stop');
        
        recordVideoBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            recordVideoBtn.style.display = 'none';
            stopVideoBtn.style.display = 'block';
            
            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
        });
            const videoPlayer = document.createElement('video');
            videoPlayer.classList.add('video');
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(videoPlayer);

            const downloadBtn = document.createElement('div');
            downloadBtn.classList.add('download_btn');

            downloadBtn.innerHTML = '&#129095';


            downloadBtn.addEventListener('click', (event) => {
                const blob = new Blob(chunk)
           
               
                const link = document.createElement('a');
                link.href =  URL.createObjectURL(blob);;
                link.rel = 'noopener';
                link.download = 'video.mp4';
                link.click();
                
            });
            postCont.append(downloadBtn)
            videoPlayer.setAttribute('controls', 'controls');
            this.chat.append(postCont);
            this.chat.scrollTop += postCont.offsetHeight ;
            this.currentPost = postCont;
           
            const recorder = new MediaRecorder(media);
            const chunk = [];

           
            recorder.addEventListener('dataavailable', (event) => {
                chunk.push(event.data)
            });
            recorder.addEventListener('stop', () => {
                const blob = new Blob(chunk)
               
                videoPlayer.src = URL.createObjectURL(blob);
               
            });
            recorder.start();

            stopVideoBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                recordVideoBtn.style.display = 'block';
                stopVideoBtn.style.display = 'none';
                recorder.stop();
                media.getTracks().forEach(track => track.stop());
       
            })
    })
    }

    audioPost() {
        
        const recordAudioBtn = document.querySelector('.audio_record');
        const stopAudioBtn = document.querySelector('.audio_stop');
       
        recordAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            recordAudioBtn.style.display = 'none';
            stopAudioBtn.style.display = 'block';

            const media = await navigator.mediaDevices.getUserMedia({
                audio: true,
        });
      
        const audioPlayer = document.createElement('audio');
        const postCont = document.createElement('div');
        postCont.classList.add('post_cont');
        audioPlayer.classList.add('audio');
        postCont.append(audioPlayer);

        const downloadBtn = document.createElement('div');
        downloadBtn.classList.add('download_btn');

        downloadBtn.innerHTML = '&#129095';


        downloadBtn.addEventListener('click', (event) => {
            const blob = new Blob(chunk)
           
               
            const link = document.createElement('a');
            link.href =  URL.createObjectURL(blob);;
            link.rel = 'noopener';
            link.download = 'audio.mp3';
            link.click();
                
        });
        postCont.append(downloadBtn)
      
        audioPlayer.setAttribute('controls', 'controls');
        this.chat.append(postCont);
        this.chat.scrollTop += postCont.offsetHeight ;
        this.currentPost = postCont;
        const recorder = new MediaRecorder(media);
        const chunk = [];

   
        recorder.addEventListener('dataavailable', (event) => {
            chunk.push(event.data)
           
        });
        recorder.addEventListener('stop', () => {
            const blob = new Blob(chunk)
           
            const urlBlob =  URL.createObjectURL(blob);
            audioPlayer.src = urlBlob;
           
        });
        recorder.start();

        stopAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            recordAudioBtn.style.display = 'block';
            stopAudioBtn.style.display = 'none';

            recorder.stop();
            media.getTracks().forEach(track => track.stop());
           
       
        })
    })
    }

    textPost() {
      
       
        this.submitBtn.addEventListener('click', async (event) => {
            event.preventDefault(); 

            const textValue = this.text.value;

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

            if(textValue.indexOf('@schedule') != -1) {
                
                const inputSlice = textValue.split(' ');
                let [shedule,  day, time, ...text] = inputSlice;

                const currentDate = Date.now();
                const appDate =  Date.parse(day + 'T' + time);
                const textForNoti = text.join(' ');
                function  showNoti() {
                 new Notification(textForNoti);  
               }
               setTimeout(showNoti, appDate-currentDate );
                
               
                this.text.value = '';
                return;
              
            }
           
            const body = new FormData();
            body.append('message', textValue);
            body.append('type', 'text');
            this.api.add(body)
           
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(textValue);
            this.chat.append(postCont);
            
            this.chat.scrollTop += postCont.offsetHeight 
      
           
            this.currentPost = postCont;
            this.text.value = '';
        });
    };
        
    
}