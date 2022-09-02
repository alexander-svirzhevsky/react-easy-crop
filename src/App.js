import "./App.css";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";

const initData = [
  {
    id: 1,
    imageUrl: "images/image1.jpg",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/image2.avif",
    croppedImageUrl: null,
  },
  {
    id: 3,
    imageUrl: "images/image3.jpeg",
    croppedImageUrl: null,
  },
];

function App() {
  const [images, setImages] = useState(initData);
  const [selectedImage, setSelectedImage] = useState(null);

  const onCancel = () => {
    setSelectedImage(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newImageList = [...images];
    const imageIndex = images.findIndex((x) => x.id === id);
    const image = images[imageIndex];
    const newImage = { ...image, croppedImageUrl, crop, zoom, aspect };
    newImageList[imageIndex] = newImage;
    setImages(newImageList);
    setSelectedImage(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  return (
    <div>
      {selectedImage ? (
        <ImageCropDialog
          id={selectedImage.id}
          imageUrl={selectedImage.imageUrl}
          cropInit={selectedImage.crop}
          zoomInit={selectedImage.zoom}
          aspectInit={selectedImage.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}
      {images.map((item) => (
        <div className="image" key={item.id}>
          <img
            src={item.croppedImageUrl ? item.croppedImageUrl : item.imageUrl}
            alt=""
            onClick={() => setSelectedImage(item)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
