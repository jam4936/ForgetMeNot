import React from "react";
import './UploadMedia.css';
import Thumbnail from "./Thumbnail/Thumbnail"
import AddImage from "./AddImage/AddImage"

class UploadMedia extends React.Component <{}, {isTablet: boolean}>{

    render(){
        return (
            <div id="mediaUpload">
                <h1>5. Upload Media</h1>

                <section>
                    <div className="imageGrid">
                        <Thumbnail image="https://picsum.photos/200/300"></Thumbnail>
                        <Thumbnail image="https://cdn.pixabay.com/photo/2019/10/03/12/12/javascript-4523100_960_720.jpg"></Thumbnail>
                        <Thumbnail image="https://images.pexels.com/photos/13247739/pexels-photo-13247739.jpeg?cs=srgb&dl=pexels-gaye-k%C4%B1rk%C4%B1n-13247739.jpg&fm=jpg&_gl=1*11p66fg*_ga*MTAyOTUzODA3OC4xNjY2NjMyNzU5*_ga_8JE65Q40S6*MTY2NjYzMjc1OS4xLjEuMTY2NjYzMjc2My4wLjAuMA.."></Thumbnail>
                    </div>

                    <br />

                    <AddImage></AddImage>
                </section>
            </div>
        );
    }
}

export default UploadMedia;