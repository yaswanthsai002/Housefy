import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
const ImageDragDropBrowseModal = ({ showModal, setShowModal, fileRef }) => {
  const [imageURL, setImageURL] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);

  const dragTextRef = useRef(null);
  const browseTextRef = useRef(null);
  const containerRef = useRef(null);

  const handleFileInputChange = () => {
    const imageFile = fileRef?.current.files[0];
    if (imageFile && imageFile.type.startsWith("image/")) {
      setImageURL(URL.createObjectURL(imageFile));
      setImageFileName(imageFile.name);
      browseTextRef.current.innerText = "Browse for an image";
    } else {
      browseTextRef.current.innerText = "Please select a valid image file";
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dragTextRef.current.innerText = "Drop image file here";
  };

  const handleDragEnter = () => {
    dragTextRef.current.innerText = "Drop image file here";
  };

  const handleDragLeave = () => {
    dragTextRef.current.innerText = "Drag and Drop image here";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (imageFile && imageFile.type.startsWith("image/")) {
      setImageURL(URL.createObjectURL(imageFile));
      setImageFileName(imageFile.name);
      dragTextRef.current.innerText = "Drag and Drop image here";
    } else {
      dragTextRef.current.innerText = "Please drop a valid image file";
    }
  };

  const handleModalClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    showModal && (
      <div
        className="fixed inset-0 min-h-screen bg-black bg-opacity-30 z-20 backdrop-blur-sm"
        onClick={handleModalClick}
      >
        <div
          ref={containerRef}
          className="min-h-screen flex justify-center items-center"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="bg-white md:size-[450px] size-[300px] rounded-md p-4 flex flex-col justify-center items-center md:gap-y-8 gap-y-4 md:border-8 border-4 border-slate-800 border-dashed text-slate-800">
            {!imageURL ? (
              <div className="flex flex-col justify-center items-center gap-y-8 w-full h-full">
                <h1 className="md:text-2xl text-xl" ref={dragTextRef}>
                  Drag and Drop image here
                </h1>
                <p className="md:text-lg">or</p>
                <div className="flex flex-col justify-between items-center md:gap-y-4 gap-y-2">
                  <h1 className="md:text-2xl text-xl" ref={browseTextRef}>
                    Browse for an image
                  </h1>
                  <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileRef.current.click();
                    }}
                    className="bg-slate-800 md:p-2 p-1 text-white rounded-md text-sm border-2 border-transparent hover:border-slate-800 hover:text-slate-800 transition-all ease-in-out duration-200 hover:bg-white"
                  >
                    Browse Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-y-8 w-full h-full">
                <img
                  src={imageURL}
                  alt={imageFileName}
                  className="md:max-w-[300px] max-w-[200px]"
                />
                <div className="flex flex-col justify-between items-center gap-y-4">
                  <p className="font-semibold">
                    Selected File:{" "}
                    <span className="text-sm font-normal">{imageFileName}</span>
                  </p>
                  <div className="flex justify-between items-center gap-x-8">
                    <button
                      type="button"
                      className="bg-slate-800 md:px-4 md:py-2 p-1 text-white rounded-md text-sm border-2 border-transparent hover:border-slate-800 hover:text-slate-800 transition-all ease-in-out duration-200 hover:bg-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-slate-800 md:px-4 md:py-2 p-1 text-white rounded-md text-sm border-2 border-transparent hover:border-slate-800 hover:text-slate-800 transition-all ease-in-out duration-200 hover:bg-white"
                      onClick={() => {
                        setImageFileName(null);
                        setImageURL(null);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ImageDragDropBrowseModal;
