import S3 from "aws-sdk/clients/s3"

// Here we are using the aws-sdk to create a new s3 instance
// We store these vars in .env
export const s3 = new S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    signatureVersion: process.env.AWS_S3_SIGNATURE_VER,
});

// Here we export the configuration to set the sizeLimit of files to 12mb
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "12mb"
        }
    }
}