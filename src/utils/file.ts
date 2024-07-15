import Resizer from "react-image-file-resizer";

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const resizeFile = (file: Blob): Promise<string> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });
