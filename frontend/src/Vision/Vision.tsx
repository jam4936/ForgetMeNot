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
    frameElement: any;
    distancePairings = [[1,28,17],[1,29,17],[2,30,16],[2,31,16]]
    glanceScore: number;
    debug = false
    webcam: any;

    constructor(props: {} | Readonly<{}>){
        super(props)
        this.videoElement = React.createRef();
        this.canvasElement = React.createRef();
        this.outputElement = React.createRef();
        this.textElement = React.createRef();
        this.inputElement = React.createRef();
        this.frameElement = React.createRef();
        this.glanceScore = 5;
        this.webcam=React.createRef();
    }

    async hasCameras(){
        
    
        let devices = await navigator.mediaDevices.enumerateDevices()
        
        let haveAllDevices=false;
        devices.forEach((device)=>{
            if(!(device.kind=='videoinput')){
                haveAllDevices=true;
            }
        });
        return haveAllDevices;
        
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
        
        let promiseTimeout = new Promise((resolve,reject)=>{
            let wait = setTimeout(()=>{
                clearTimeout(wait);
                resolve({slow:true})
            },500)
        })

        
        const race = Promise.race([faceapi.detectSingleFace(videoEl, options).withFaceLandmarks(),promiseTimeout])
        //console.log(typeof result)
        race.then((res: any)=>{
            
            if(res){

            //console.log(res)
                const canvas = this.canvasElement.current;
                const dims = faceapi.matchDimensions(canvas, videoEl, true)
                const resizedResult = faceapi.resizeResults(res, dims)
                const landmarksFromResults = res.landmarks.positions;
                let xMax = 0
                let yMax = 0
                let xMin = 0
                let yMin = 0
                let normalizedPoints: any[] = []
                let area = res.alignedRect.relativeBox.area/.18;
                landmarksFromResults.forEach((e: { x: number; y: number; })=>{
                    
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
                landmarksFromResults.forEach((e: { x: number; y: number; })=>{
                    let normal = {x : 0, y: 0, count:count}
                    normal.x  = (e.x-xMin)/(xMax-xMin)
                    normal.y = (e.y-yMin)/(yMax-yMin)
                    count++;
                    normalizedPoints.push(normal)
                    
                })
                const box = res.alignedRect.box
                
                const topMidpointX  = ((box.topRight.x - box.topLeft.x)/2) + box.topLeft.x
            
                let nonLeftPoints = 0
                landmarksFromResults.forEach((e: { x: number; })=>{
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
                }
                else{

                    this.glanceScore --;
                    if(this.glanceScore<0){
                        this.glanceScore = 0;
                    }
                }
                this.outputElement.current.value = Math.abs(nonLeftPoints-34)
                this.textElement.current.value = nonLeftPoints;
                if (this.debug) {
                    faceapi.draw.drawDetections(canvas, resizedResult)
                    faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
                }
           
            }
            else{

                this.glanceScore--;
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
            
            this.inputElement.current.value = this.glanceScore
            const frameTime = Math.round((Date.now()-ts) * 100) / 100
            this.frameElement.current.value = frameTime;
            
        })
        
        
            
            
            
    
            setTimeout(() => this.onPlay(), 750)
        
    }

    async getWebcam(){
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
        console.log("Stream",stream)
        let devices = await navigator.mediaDevices.enumerateDevices()
        let frontDevice :any;
        devices.forEach(device=>{
            if (device.kind === 'videoinput') {
                if (device.label && device.label.length > 0) {
                    if (device.label.toLowerCase().indexOf('front') >= 0) {
                        console.log("Device", device)
                        frontDevice = device
                    }
                }
            }
        })
        if(frontDevice){
            return frontDevice
        }
        else{
            return stream;
        }
        
        
    }

    async componentDidMount(){
        console.log('loading model')
        await faceapi.nets.ssdMobilenetv1.load('/models')
        await faceapi.loadFaceLandmarkModel('/models')
        console.log('Model loaded: ', faceapi.nets.tinyFaceDetector)
        
        const stream = await this.getWebcam()
        console.log('Found stream is: ', stream)

        let hasWebcam = await this.hasCameras()
        console.log(hasWebcam)
        this.webcam.current.value = hasWebcam   
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
                        <video  style = {{height:"40px",width:"40px"}}ref={this.videoElement} onLoadedMetadata={()=>this.onPlay()} id="inputVideo" autoPlay muted playsInline></video>
                        <canvas ref={this.canvasElement} id="overlay" />
                    </div>

                    <div className="row side-by-side">
                        <div id="fps_meter" className="row side-by-side">
                            <div>
                                <label>Glance score: </label>
                                <input ref={this.inputElement} value="" id="in" type="text" className="bold"/>
                                <br/>
                                <label>Processing time is (ms): </label>
                                <input ref={this.frameElement} value="" id="in" type="text" className="bold"/>
                                <br/>
                                <label>Landmarks in the subbox:</label>
                                <input ref={this.textElement} disabled value="-" id="time" type="text" className="bold"/>
                                <br/>
                                <label>Is Face There?: </label>
                                <input ref={this.outputElement} disabled value="" id="fps" type="text" className="bold"/>
                                <br/>
                                <label>Is webcam detected </label>
                                <input ref={this.webcam} disabled value="" id="fps" type="text" className="bold"/>
                                <br/>
                                

                            </div>
                        </div>

                    </div>
                </div>
                    
            </body>);
    }

}

export default Vision;