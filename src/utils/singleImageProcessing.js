export const imageProcessing = (event, dataLength) => {
  const files = event.target.files;
  const getObjFromFileData = files[0];
  const makeImgId = dataLength + 1;
  const makeImgUrl = URL.createObjectURL(getObjFromFileData);
  const dataObject = {
    id: makeImgId,
    url: makeImgUrl,
  };
  return dataObject;
};
