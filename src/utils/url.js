function dataURItoBlob(dataURI) {
  // Split the data URI into two parts: metadata and base64 data
  const splitDataURI = dataURI.split(',');
  // Get the mime-type of the data
  const mime = splitDataURI[0].match(/:(.*?);/)[1];
  // Decode the base64 data
  const byteString = atob(splitDataURI[1]);
  // Create an ArrayBuffer and initialize it with the byte string
  const arrayBuffer = new ArrayBuffer(byteString.length);
  // Create a typed array to represent the array buffer
  const byteArray = new Uint8Array(arrayBuffer);
  // Iterate through each character of the byte string and set the typed array value
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  // Create a blob from the typed array and return it
  return new Blob([arrayBuffer], { type: mime });
}

export default dataURItoBlob;
