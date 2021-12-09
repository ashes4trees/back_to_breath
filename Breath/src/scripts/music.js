const options = [
    { number: 0, file_name: './src/assets/music/piano-moment-9835.mp3'},
    { number: 1, file_name: './src/assets/music/chill-ambient-11322.mp3'},
    { number: 2, file_name: './src/assets/music/forest-with-small-river-birds-and-nature-field-recording-6735.mp3'}
]



class Music {
    constructor(number, duration) {
        this.audio = document.querySelector('#audio');
        this.audio.src = `${options[number].file_name}`;
        this.audio.load();
        this.audio.play();

        this.duration = duration;
        this.musicButton();
    }

    playToggle() {
       return this.audio.paused ? this.audio.play() : this.audio.pause();
    }

    musicButton() {
        const audio = this.audio;
        const button = document.querySelector("#play-pause");
        
        button.addEventListener('click', (e) => {
            this.playToggle();
            if (audio.paused) {
                button.className = "fas fa-play";
            } else {
                button.className = "fas fa-pause";
            } 
        }
        )
    }

}

export default Music;