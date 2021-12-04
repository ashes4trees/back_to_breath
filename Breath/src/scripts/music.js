
class Music {
    constructor(audio) {
        this.audio = audio;
    }

    playToggle() {
       return this.audio.paused ? this.audio.play() : this.audio.pause();
    }
}