import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import 'dotenv/config';


const s3ClientConfig: S3ClientConfig = {
    region: process.env.NEXT_PUBLIC_S3BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3BUCKET_ACCESSKEY+'' ,
        secretAccessKey: process.env.NEXT_PUBLIC_S3BUCKET_SECRETKEY+'', 
    }
};

const s3Client = new S3Client(s3ClientConfig);


export const uploadToS3Bucket = async (data: File, onProgress: any) => {

    try {

        // const name = data.name + "_" + Date.now().toString()
        const params = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            Key: Date.now().toString(),
            Body: data
        };

        const upload = new Upload({
            client: s3Client,
            params, queueSize: 3,
            leavePartsOnError: false,
        });

        upload.on('httpUploadProgress', (progress: any) => {
            if (progress.total) {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                onProgress(percentage);
            }
        });

        await upload.done();

        const objectKey = params.Key;
        const region = process.env.NEXT_PUBLIC_S3BUCKET_REGION || 'eu-north-1';
        const url = `https://${params.Bucket}.s3.${region}.amazonaws.com/${objectKey}`;
        return url;

    } catch (err) {
        console.error('Error uploading video to S3:', err);
        throw err;
    }
};