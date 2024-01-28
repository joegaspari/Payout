import S3 from "aws-sdk/clients/s3"
import { auth } from '@clerk/nextjs'
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

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

export default async(req: NextApiRequest, res: NextApiResponse) => {
    // Only allow post methods
    if (req.method !== "POST") {
        return new NextResponse('Method Not Allowed', {status: 405})
        // Which way do we want to do this
        // return res.status(405).json({message: "Method not allowed"})
    }
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        // retrieving name and type from the body of the request
        let {name, type} = await req.body;

        // Lets make a file key that is unique only to the user, by including the userID in the key name
        const key_name = `${name}-${userId}`

        // Setting up parameters for file
        const fileParams = { 
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key_name,
            Expires: 600,
            ContentType: type,
        }
        
        // Now we can generate a new signed URL from s3
        const url = await s3.getSignedUrlPromise('putObject', fileParams);

        // Now we fire it off
        res.status(200).json({url});
    }catch (error) {
        console.log('[S3 PutObject]', error)
        return new NextResponse('Internal error', {status: 500})
    }
}


// export default async function aws(file:File){
//     try{
//         const fileParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: file.name,
//             Expires: 600,
//             ContentType: file.type
//         }

//         // We will create a signed url for additional security 
//         const url = await s3.getSignedUrlPromise("putObject", fileParams);

//         await axios.put(url, file, {
//             headers:
//             {
//                 "Content-Type": String(file.type)
//             }
//         })

//     }catch(err){
//         return err;
//     }
// }

// export async function awsGetFile(key:String) {
//     try {
//         const fileParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: key,
//         };

//         // Get a signed URL for reading the object from S3
//         const url = await s3.getSignedUrlPromise("getObject", fileParams);

//         // Use Axios to make a GET request to the signed URL
//         const response = await axios.get(url);

//         // The response.data contains the contents of the S3 object
//         return response.data;
//     } catch (err) {
//         return err;
//     }
// }