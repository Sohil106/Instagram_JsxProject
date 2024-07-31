import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PostVideo from '../home/PostVideo';

const AddPostCarousel = ({ PostUrls }) => {
  const renderMedia = (url) => {
    if (url.startsWith('data:')) {
      // Extract file type and base64 from the data URI
      const [header, base64] = url.split(',');
      const fileType = header.split(':')[1].split(';')[0];

      // Log fileType and base64 to the console
      // console.log('File Type:', fileType);
      // console.log('Base64 Data:', base64);

      if (fileType.startsWith('image/')) {
        return (
          <img
            className="object-cover object-center w-full max-w-full  p-2 aspect-auto"
            src={url}
            alt="gallery-media"
          />
        );
      } else if (fileType.startsWith('video/')) {
        return (
         <PostVideo fileType={fileType} base64={base64}/>
        );
      } else {
        return <p>Unsupported media type</p>;
      }
    }
  };

  return (
    <Carousel showThumbs={false} showStatus={false} showIndicators={PostUrls.length > 1} className="mt-2">
      {PostUrls.length > 0 && PostUrls.map((postUrl, index) => (
        <div className="ABC flex items-center h-full w-full " key={index}>
          {renderMedia(postUrl)}
        </div>
      ))}
    </Carousel>
  );
};

export default AddPostCarousel;
