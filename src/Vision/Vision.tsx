import React from 'react';
import './styles.css'
import * as faceapi from 'face-api.js'
class Vision extends React.Component {
    videoElement: any;
    canvasElement: any;
    cvModel: any;
    outputElement: any;
    textElement: any;
    inputElement: any;
    distancePairings = [[1,28,17],[1,29,17],[2,30,16],[2,31,16]]
    glanceScore: number;


    constructor(props: {} | Readonly<{}>){
        super(props)
        this.videoElement = React.createRef();
        this.canvasElement = React.createRef();
        this.outputElement = React.createRef();
        this.textElement = React.createRef();
        this.inputElement = React.createRef();
        this.glanceScore = 5;
    }
    getFaceDetectorOptions() {
        const minConfidence = 0.5

        // TinyFaceDetectorOptions
        const inputSize = 128
        const scoreThreshold = 0.5
        return new faceapi.SsdMobilenetv1Options({ minConfidence })
    }

    getNose(landmarks:any){
        return [landmarks[28],landmarks[29],landmarks[30],landmarks[31]]
    }
    getRight(landmarks:any){
        return [landmarks[17],landmarks[16]]
    }
    getLeft(landmarks:any){
        return [landmarks[1],landmarks[2]]
    }

    getNthPoint(leftB: number,rightB: number,parts: number){
        const topMidpointX  = ((rightB - leftB)/parts) + leftB
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
            //console.log(result.alignedRect.box)
            
            const canvas = this.canvasElement.current;
            const dims = faceapi.matchDimensions(canvas, videoEl, true)
            const resizedResult = faceapi.resizeResults(result, dims)
            const landmarksFromResults = result.landmarks.positions;
            let xMax = 0
            let yMax = 0
            let xMin = 0
            let yMin = 0
            let normalizedPoints: any[] = []
            let area = result.alignedRect.relativeBox.area/.18;
            landmarksFromResults.forEach(e=>{
                
                if(e.x>xMax){
                    xMax = e.x
                }
                if(e.y>yMax){
                    yMax  = e.y
                }
                if(e.x<xMin){
                    xMin  = e.x
                }
                if(e.y<yMin){
                    yMin  = e.y
                }
            })
            let count = 0
            landmarksFromResults.forEach(e=>{
                let normal = {x : 0, y: 0, count:count}
                normal.x  = (e.x-xMin)/(xMax-xMin)
                normal.y = (e.y-yMin)/(yMax-yMin)
                count++;
                normalizedPoints.push(normal)
                
            })
            const box = result.alignedRect.box
            //const topMidpointX = this.getNthPoint(box.topLeft.x,box.topRight.x,2)
            const topMidpointX  = ((box.topRight.x - box.topLeft.x)/2) + box.topLeft.x
            console.log(topMidpointX)
            let nonLeftPoints = 0
            landmarksFromResults.forEach(e=>{
                if(e.x >= topMidpointX){
                    nonLeftPoints++;
                }
                else{

                }
            })

            if(Math.abs(nonLeftPoints-34)<19){
                this.glanceScore ++;
                if(this.glanceScore>10){
                    this.glanceScore = 10;
                }
                //this.outputElement.current.style.backgroundColor="#00B1E1"
            }
            else{

                this.glanceScore --;
                if(this.glanceScore<0){
                    this.glanceScore = 0;
                }
            }

            if(this.glanceScore>2){
                this.outputElement.current.style.backgroundColor="#00B1E1"
            }
            else{
                this.outputElement.current.style.backgroundColor="#E9573F"
            }

            this.textElement.current.value = nonLeftPoints;
            this.inputElement.current.value = this.glanceScore
            if (true) {
            faceapi.draw.drawDetections(canvas, resizedResult)
            }
            faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
            
            }
    
            setTimeout(() => this.onPlay(), 750)
        
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
                                <label>Glance score: </label>
                                <input ref={this.inputElement} value="" id="in" type="text" className="bold"/>
                                <label>Landmarks in the subbox:</label>
                                <input ref={this.textElement} disabled value="-" id="time" type="text" className="bold"/>
                                <label>Is Face There?: </label>
                                <input ref={this.outputElement} disabled value="" id="fps" type="text" className="bold"/>
                                

                            </div>
                        </div>

                    </div>
                </div>
                    
            </body>);
    }

}

export default Vision;