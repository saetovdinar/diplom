import ChatApi from "./ChatApi";



export default class Chat {
    constructor(container) {
        this.container = container;
        
        this.submitBtn = document.querySelector('.submit');
        this.text = document.querySelector('.input');
        this.chat = document.querySelector('.chat');

        this.fileLoadBtn = document.querySelector('.overlap');
        this.fileLoad = document.querySelector('.file_load');
        

        this.recordVideoBtn = document.querySelector('.video_record');
        this.stopVideoBtn = document.querySelector('.video_stop');

        this.recordAudioBtn = document.querySelector('.audio_record');
        this.stopAudioBtn = document.querySelector('.audio_stop');
        this.eventRegister();



        this.api = new ChatApi('http://localhost:7070')

        // this.renderChatStorage();
       
  
       
    }

    wsEvents() {
        const ws = new WebSocket('ws://localhost:7070/ws')
        this.submitBtn.addEventListener('click', () => {
            const msg = this.text.value;

            ws.send(msg)

            this.text.value = '';
        })
        ws.addEventListener('open' , (e) => {
      

            console.log('ws open');
        });

        ws.addEventListener('error' , (e) => {
      

             console.log('ws error');
        });

        ws.addEventListener('close' , (e) => {
     

            console.log('ws close');
        });

        ws.addEventListener('message' , (e) => {
            console.log('ws message');
            console.log(e.data);
            JSON.parse(e.data).forEach(msg => {
       

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
                this.chat.append(postCont)
            })
            
        });
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
    postGeo(postCont) {
        
        const geoCont = document.createElement('div');
        geoCont.classList.add('geo_cont');
        navigator.geolocation.getCurrentPosition((data) => {
            const {latitude, longitude} = data.coords;
            geoCont.append(`[${latitude}, ${longitude}]`)
            postCont.append(geoCont);
           data.coords
        })
        
        
    }
    eventRegister() {
        this.videoPost();
        this.audioPost();
        this.textPost();
        this.loadFile();
        this.lazyLoad();
        this.DragNDrop();
        this.wsEvents();
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
            this.currentPost = postCont;
            this.postGeo(this.currentPost);
            postCont.append(contentCont)
            postCont.append(downloadBtn)
            this.chat.append(postCont)
            
    }
       

    )}

 
    createPLayer(type) {
        const player = document.createElement(type);
        player.classList.add(type);
        player.setAttribute('controls', 'controls');
    
        const postCont = document.createElement('div');
        postCont.classList.add('post_cont');
    
        postCont.append(player);

        return [postCont, player];
    }
     
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
       
    createDownloadBtn(chunk) {
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
            return downloadBtn;
       }
       
    videoPost() {
            
            
            this.recordVideoBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                this.recordVideoBtn.style.display = 'none';
                this.stopVideoBtn.style.display = 'block';
                
                const media = await navigator.mediaDevices.getUserMedia({
                    video: true,
            });
                
                const [postCont, player] = this.createPLayer('video');
                
              
               
                this.currentPost = postCont;
    
                this.postGeo(this.currentPost);
    
                const chunk = [];
                const record = this.recorder(media, chunk,player);
    
                const downloadBtn = this.createDownloadBtn(chunk);
    
                postCont.append(downloadBtn);
                this.chat.append(postCont);
    
                this.chat.scrollTop += postCont.offsetHeight ;
               
                this.stopVideoBtn.addEventListener('click', async (event) => {
                    event.preventDefault();
                    this.recordVideoBtn.style.display = 'block';
                    this.stopVideoBtn.style.display = 'none';
                    record.stop();
                    media.getTracks().forEach(track => track.stop());
           
                })
        })
        }
    
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
    
                const downloadBtn = this.createDownloadBtn(chunk);
    
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

    textPost() {
  
        
        this.submitBtn.addEventListener('click', async (event) => {
            event.preventDefault(); 
            const textValue = this.text.value
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
            this.postGeo(this.currentPost);
            this.text.value = '';
        });
    };
        
    
}