import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer ///here you add your api key///",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            }
        );
        let data = await response.json();
       // data_array = data.data;
        setImage_url(data)
        console.log(data);
        // Update the image_url state with the actual image URL from the response
        setImage_url(data.image_url);
    }

    return (
        <div className='ai_image_generator'>
            <div className='header'>AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url === "/" ? default_image : image_url} alt="" /></div>
            </div>
            <div className="search-box">
            <div class="container">
                <div class="input-group">
              <label class="input-group__label" for="myInput"></label>
              <input type="text" id="myInput" class="input-group__input" value="Enter what you want to describe" />
                </div>
                   </div>
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
}

export default ImageGenerator;
