/* --- DEPENDENCIES --- */
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import firebase from 'firebase';
import { isLocal } from '@config/config';
import { storageRef } from '@config/firebase/firebaseConfig';
/* -------------------- */

export interface UploadDataResponse {
  metaData: firebase.storage.FullMetadata;
  downloadUrl: string;
}

export enum DeleteResponse {
  ok = 'OK',
  error = 'ERROR',
  noFile = 'NO FILE',
}

type UseFileUploadResponse = [
  {
    fileData: UploadDataResponse | undefined;
    loading: boolean;
    isError: boolean;
    progress: number;
  },
  () => Promise<DeleteResponse>,
  Dispatch<SetStateAction<File | undefined>>,
];

const useFileUpload = (imageFolder: string): UseFileUploadResponse => {
  const [fileData, setFileData] = useState<UploadDataResponse | undefined>();
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const uploadData = async (): Promise<void> => {
      setIsError(false);
      setLoading(true);
      setProgress(0);
      if (!fileToUpload) return;

      try {
        const fName = `${Math.floor(Date.now() / 1000)}`;
        const ref = storageRef.child(imageFolder + fName);
        const uploadTask = ref.put(fileToUpload);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (progress) => {
            const value = progress.bytesTransferred / progress.totalBytes;
            isLocal() && console.log('Upload is ' + value * 100 + '% done');
            setProgress(value);
          },
          (error) => {
            setLoading(false);
            isLocal() && console.log('Error Uploading File: ', error);
            setIsError(true);
          },
          async () => {
            setIsError(false);
            setLoading(false);

            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

            setFileData({
              metaData: uploadTask.snapshot.metadata,
              downloadUrl,
            });

            setProgress(1);
          },
        );
      } catch (error) {
        setLoading(false);
        isLocal() && console.log('Error Uploading File: ', error);
        setIsError(true);
      }
    };

    fileToUpload && uploadData();
  }, [fileToUpload, imageFolder]);

  const handleDeleteFile = async (): Promise<DeleteResponse> => {
    if (fileData) {
      const imageRef = storageRef.child(imageFolder + fileData?.metaData.name);
      try {
        const response = await imageRef.delete();
        if (response) {
          isLocal() && console.log('Error Deleting file (try): ', response);
          setIsError(true);
          return DeleteResponse.error;
        }
        setFileData(undefined);
        return DeleteResponse.ok;
      } catch (error) {
        isLocal() && console.log('Error Deleting file (catch): ', error);
        setIsError(true);
        return DeleteResponse.error;
      }
    }

    return DeleteResponse.noFile;
  };

  return [{ fileData, loading, isError, progress }, handleDeleteFile, setFileToUpload];
};

export default useFileUpload;
