import React from 'react';
import AWS from 'aws-sdk'


const s3 = new AWS.S3({
  accessKeyId: `${import.meta.env.ACCESS_KEY_ID}`,
  secretAccessKey: `${import.meta.env.SECRET_ACCESS_KEY}`,
  region: `${import.meta.env.BUCKET_REGION}`,
});
const S3Uploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    Promise.all(files.map((file) => uploadFileToS3(file))).then((results) => {
      setUploadedFiles(results);
    });
  };

  const uploadFileToS3 = (file) => {
    const params = {
      Bucket: `${import.meta.env.BUCKET_NAME}`,
      Key: file.name,
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const url = `https://${params.Bucket}.s3.${s3.config.region}.amazonaws.com/${params.Key}`;
          resolve({ path: params.Key, url: url });
        }
      });
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileUpload} />
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            {file.path} - <a href={file.url}>Public URL</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default S3Uploader;