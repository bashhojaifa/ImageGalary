import React, { useState, useRef } from "react";
import value from "../components/data/data.json";
import Image from "../components/Image";
import { imageProcessing } from "../utils/singleImageProcessing";

const Home = () => {
  const [data, setData] = useState(value);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [deleteImageId, setDeleteImageId] = useState([]);

  // image select handler
  const selectImageHandler = (imageId) => {
    if (!deleteImageId.includes(imageId)) {
      setDeleteImageId([...deleteImageId, imageId]);
    } else {
      setDeleteImageId(deleteImageId.filter((item) => item != imageId));
    }
  };

  // selected image delete
  const handleDeleteImage = () => {
    const remainingImage = data.filter((image) => {
      if (!deleteImageId.includes(image.id)) {
        return image;
      }
    });
    setData(remainingImage);
    setDeleteImageId([]);
  };

  // image upload handler
  const imageUploadHandler = (event) => {
    const addNewImgToImgObj = imageProcessing(event, data.length);
    setData([...data, addNewImgToImgObj]);
  };

  // start image drag and drop
  const dragStartHandler = (event, index) => {
    event.dataTransfer.setData("index", index);
    setDraggedIndex(index);
  };

  const dropImageHandler = (event, newIndex) => {
    const startIndex = event.dataTransfer.getData("index");
    const updatedBoxes = [...data];
    const [draggedBox] = updatedBoxes.splice(startIndex, 1);
    updatedBoxes.splice(newIndex, 0, draggedBox);
    setData(updatedBoxes);
    setDraggedIndex(null);
  };

  const dragOverHandler = (event, index) => {
    event.preventDefault();
    if (index !== draggedIndex) {
      setDraggedIndex(index);
    }
  };
  // end image drag and drop

  return (
    <div className="mx-auto w-[80%]  my-10">
      {deleteImageId.length > 0 ? (
        <>
          <nav className=" w-[80%] bg-white flex lg:flex-row md:flex-col flex-col justify-between rounded-t-md mx-auto py-5 px-4 border-b-2 border-b-slate-300">
            <div className="flex items-center">
              <input
                checked={deleteImageId.length}
                onChange={() => setDeleteImageId([])}
                className="w-5 h-5"
                type="checkbox"
              />
              <p className="font-bold ml-5 text-2xl">
                {deleteImageId.length === 1
                  ? `${deleteImageId.length} File Selected`
                  : `${deleteImageId.length} Files Selected`}
              </p>
            </div>
            <div>
              <button
                onClick={handleDeleteImage}
                className="text-red-600 font-medium border-none text-2xl lg:m-0 md:mt-5 sm:mt-4"
              >
                Delete File
              </button>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="bg-white text-2xl font-bold w-[80%] rounded-t-md mx-auto py-5 px-4 border-b-2 border-b-slate-300">
            <h1>Gallery</h1>
          </nav>
        </>
      )}

      <section className="bg-white grid rounded-b-md  lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-[80%] mx-auto py-8 px-5">
        {data?.map((item, index) => {
          return (
            <Image
              key={index}
              image={item}
              index={index}
              selectImage={selectImageHandler}
              dropImage={dropImageHandler}
              dragStart={dragStartHandler}
              draggedIndex={draggedIndex}
              dragOver={dragOverHandler}
              imageId={deleteImageId}
            />
          );
        })}

        <div className="relative border-2 border-dashed rounded-md  flex flex-col justify-center items-center w-[100%]">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                ></path>
              </svg>
              <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Click to upload
              </p>
            </div>
            <input
              className="hidden"
              accept="image/*"
              id="imageUpload"
              type="file"
              onChange={imageUploadHandler}
            />
          </label>
        </div>
      </section>
    </div>
  );
};

export default Home;
