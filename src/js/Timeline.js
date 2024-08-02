import ChatApi from "./ChatApi";


const api = new ChatApi('http://localhost:7070/chat')
export default class Timeline {
    constructor(container) {
        this.container = container;
        this.eventRegister();
        this.timeline = document.querySelector('.timeline');
        
    }

    eventRegister() {
        this.videoPost();
        this.audioPost();
        this.textPost();
    }
    videoPost() {
        const recordVideoBtn = document.querySelector('.video_record');
        const stopVideoBtn = document.querySelector('.video_stop');
        
        recordVideoBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            
            
            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
        });
            const videoPlayer = document.createElement('video');
            videoPlayer.classList.add('video');
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(videoPlayer);
           
            videoPlayer.setAttribute('controls', 'controls');
            this.timeline.prepend(postCont);
            this.currentPost = postCont;
           
            const recorder = new MediaRecorder(media);
            const chunk = [];

            recorder.addEventListener('start', () => {
                console.log('start')
            
            });
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
            
            const media = await navigator.mediaDevices.getUserMedia({
                audio: true,
        });
      
        const audioPlayer = document.createElement('audio');
        const postCont = document.createElement('div');
        postCont.classList.add('post_cont');
        audioPlayer.classList.add('audio');
        postCont.append(audioPlayer);
       
        audioPlayer.setAttribute('controls', 'controls');
        this.timeline.prepend(postCont);
        
        this.currentPost = postCont;
        const recorder = new MediaRecorder(media);
        const chunk = [];

        recorder.addEventListener('start', () => {
            console.log('start')
            
        });
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
            recorder.stop();
            media.getTracks().forEach(track => track.stop());
       
        })
    })
    }

    textPost() {
        
        const submitBtn = document.querySelector('.submit');
        const text = document.querySelector('.input');
        submitBtn.addEventListener('click', async (event) => {
            event.preventDefault(); 
            const body = new FormData();
            body.append('message', text.value);

            const response = api.add(body)
            response.then(data => {
                console.log(data)
            })
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(text.value);
            this.timeline.prepend(postCont);
            
            this.currentPost = postCont;
            text.value = '';
        });
    };
        
    
}