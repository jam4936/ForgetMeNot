import React from 'react';
import './styles.css'
import * as faceapi from 'face-api.js'
class Vision extends React.Component {
    videoElement: any;
    canvasElement: any;
    cvModel: any
 
    constructor(props: {} | Readonly<{}>){
        super(props)
        this.videoElement = React.createRef();
        this.canvasElement = React.createRef();
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
        if(videoEl.paused || videoEl.ended || !this.cvModel.isLoaded){
            console.log(this.cvModel)
            return setTimeout(() => this.onPlay())
        }
        console.log('FUCK')
        const options = this.getFaceDetectorOptions()

        const ts = Date.now()

        const result = await faceapi.detectSingleFace(videoEl, options)
        
        if (result) {
            const canvas = this.canvasElement.current;
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
            }
    
            setTimeout(() => this.onPlay())
        
        
      
    }


    async componentDidMount(){
        console.log('loading model')
        this.cvModel = await faceapi.nets.tinyFaceDetector.load('/')
        console.log('Model loaded')
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


                        <div id="face_detector_selection_control" className="row input-field">
                            <select id="selectFaceDetector">
                                <option value="ssd_mobilenetv1">SSD Mobilenet V1</option>
                                <option value="tiny_face_detector">Tiny Face Detector</option>
                            </select>
                            <label>Select Face Detector</label>
                        </div>



                        <div id="fps_meter" className="row side-by-side">
                            <div>
                                <label>Time:</label>
                                <input disabled value="-" id="time" type="text" className="bold"/>
                                    <label>Is Face There?: </label>
                                    <input disabled value="-" id="fps" type="text" className="bold"/>
                                    </div>
                            </div>


                        </div>



                        <span id="ssd_mobilenetv1_controls">
                            <div className="row side-by-side">
                                <div className="row">
                                    <label>Min Confidence:</label>
                                    <input disabled value="0.5" id="minConfidence" type="text" className="bold"/>
                                </div>
                            
                        
                            </div>
                        </span>

                        <span id="tiny_face_detector_controls">
                            <div className="row side-by-side">
                                <div className="row input-field">
                                    <select id="inputSize">
                                        <option value="" disabled selected>Input Size:</option>
                                        <option value="128">128 x 128</option>
                                        <option value="160">160 x 160</option>
                                        <option value="224">224 x 224</option>
                                        <option value="320">320 x 320</option>
                                        <option value="416">416 x 416</option>
                                        <option value="512">512 x 512</option>
                                        <option value="608">608 x 608</option>
                                    </select>
                                    <label>Input Size</label>
                                </div>
                                <div className="row">
                                    <label>Score Threshold:</label>
                                    <input disabled value="0.5" id="scoreThreshold" type="text" className="bold"/>
                                </div>
                                
                            </div>
                        </span>
                    </div>
                    
            </body>);
    }

}

export default Vision;