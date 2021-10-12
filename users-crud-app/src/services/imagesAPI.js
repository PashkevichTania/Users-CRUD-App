const userCode = process.env.REACT_APP_IMAGES_API_CODE;

export const getImages = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${userCode}&page=1&query=avatar`);
    const images = await response.json();
    console.log("get images: ", images);
    return images.result;
  }catch (error){
    console.log(error)
  }
}