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
        return new faceapi.SsdMobilenetv1Options({ minConfidence })
    }

    
    async onPlay(this:any){
        
        const videoEl = this.videoElement.current;
        if(!videoEl){
            return setTimeout(() => this.onPlay())
        }
        if(videoEl.paused || videoEl.ended || !faceapi.nets.ssdMobilenetv1.isLoaded){
            console.log(videoEl.paused , videoEl.ended , !faceapi.nets.ssdMobilenetv1.isLoaded)
            return setTimeout(() => this.onPlay())
        }
        
        const options = this.getFaceDetectorOptions()

        const ts = Date.now()

        const result = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks()
        
        if (result) {
            console.log(result)
            const canvas = this.canvasElement.current;
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            const resizedResult = faceapi.resizeResults(result, dims)
            const landmarks = result.landmarks.positions;
            const pointA = landmarks[9]
            const pointB = landmarks[28]
            const pointC = landmarks[31]
            const pointD = landmarks[30]
            const pointE = landmarks[29]
            //28-31

            if (true) {
            faceapi.draw.drawDetections(canvas, resizedResult)
            }
            faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
            //this.outputElement.current.value = result.score>.6
            }
    
            setTimeout(() => this.onPlay())
        
    }


    async componentDidMount(){
        console.log('loading model')
        await faceapi.nets.ssdMobilenetv1.load('/models')
        await faceapi.loadFaceLandmarkModel('/models')
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
                        <video style={{display: 'block'}} ref={this.videoElement} onLoadedMetadata={()=>this.onPlay()} id="inputVideo" autoPlay muted playsInline></video>
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