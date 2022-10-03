import React from 'react';
import './styles.css'
import * as faceapi from 'face-api.js'
class Vision extends React.Component {
    videoElement: any;
    canvasElement: any;
    cvModel: any;
    outputElement: any;
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.videoElement = React.createRef();
        this.canvasElement = React.createRef();
        this.outputElement = React.createRef();
    }
    getFaceDetectorOptions() {
        const minConfidence = 0.5

        // TinyFaceDetectorOptions
        const inputSize = 128
        const scoreThreshold = 0.5
        return new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    }

    
    async onPlay(this:any){
        
        const videoEl = this.videoElement.current;
        if(!videoEl){
            return setTimeout(() => this.onPlay())
        }
        if(videoEl.paused || videoEl.ended || !faceapi.nets.tinyFaceDetector.isLoaded){
            console.log(this.cvModel)
            return setTimeout(() => this.onPlay())
        }
        
        const options = this.getFaceDetectorOptions()

        const ts = Date.now()

        const result = await faceapi.detectSingleFace(videoEl, options)
        
        if (result) {
            console.log(result)
            const canvas = this.canvasElement.current;
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
            this.outputElement.current.value = result.score>.6
            }
    
            setTimeout(() => this.onPlay())
        
        
      
    }


    async componentDidMount(){
        console.log('loading model')
        await faceapi.nets.tinyFaceDetector.load('/models')
        console.log('Model loaded: ', faceapi.nets.tinyFaceDetector)
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
        const videoEl = this.videoElement.current;
        videoEl.srcObject = stream
    }

    
    
    
    render() {

        return (

            <body>
                <div id="navbar"></div>
                <div className="center-content page-container">

                    <div className="progress" id="loader">
                        <div className="indeterminate"></div>
                    </div>
                    <div className="margin">
                        <video ref={this.videoElement} onLoadedMetadata={()=>this.onPlay()} id="inputVideo" autoPlay muted playsInline></video>
                        <canvas ref={this.canvasElement} id="overlay" />
                    </div>

                    <div className="row side-by-side">
                        <div id="fps_meter" className="row side-by-side">
                            <div>
                                <label>Time:</label>
                                <input disabled value="-" id="time" type="text" className="bold"/>
                                    <label>Is Face There?: </label>
                                    <input ref={this.outputElement} disabled value="-" id="fps" type="text" className="bold"/>
                                    </div>
                            </div>

                        </div>
                    </div>
                    
            </body>);
    }

}

export default Vision;