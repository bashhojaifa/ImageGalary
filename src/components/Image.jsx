const Image = ({
  image,
  index,
  selectImage,
  dropImage,
  dragStart,
  draggedIndex,
  dragOver,
  imageId,
}) => {
  return (
    <div
      className={
        index === 0
          ? `lg:col-span-2 lg:row-span-2 md:row-span-2 md:col-span-2 row-span-2 col-span-2 border-gray-300 border-4 rounded-md relative cursor-grab transition-all ${
              draggedIndex === index ? "border-3 border-gray-600" : ""
            }`
          : `border-2 border-gray-300 rounded-md  relative cursor-grab transition-all ${
              draggedIndex === index ? "border-2 border-gray-600" : ""
            }`
      }
      draggable
      onDrop={(event) => dropImage(event, index)}
      onDragStart={(event) => dragStart(event, index)}
      onDragOver={(event) => dragOver(event, index)}
    >
      <img
        src={image.url}
        alt={image.url}
        className={draggedIndex === index ? "scale-50" : ""}
      />

      <div
        className={
          imageId.includes(image.id)
            ? `bg-[rgba(0,0,0,0.39)] absolute h-full w-full left-0 top-0 bottom-0 right-0  transition-all opacity-50`
            : `bg-[rgba(0,0,0,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0 opacity-0 transition-all hover:opacity-50`
        }
      >
        <input
          checked={imageId.includes(image.id)}
          onChange={() => selectImage(image.id)}
          className="absolute top-5 left-5 w-5 h-5"
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default Image;
