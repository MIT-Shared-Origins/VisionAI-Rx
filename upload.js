const { S3 } = require("@aws-sdk/client-s3");

// Initialize S3 client
const s3 = new S3({ region: "ap-southeast-2" });

// Function to handle Lambda events
exports.handler = async (event) => {
  try {
    // Parameters for S3 upload
    const filePath = `${event.imageID}.${event.fileExt}`;
    const buffer = Buffer.from(
      event.img.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const uploadParams = {
      Bucket: "mit-visionai-rx-image", // Replace with your bucket name
      Key: filePath,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    // Upload to S3
    const data = await s3.putObject(uploadParams);
    console.log("Success", data);

    // Return response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Uploaded",
        filePath: filePath,
        bucket: uploadParams.Bucket,
      }),
    };
  } catch (err) {
    console.error("Error", err);
    // Return error response
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Error uploading file",
        error: err.message,
      }),
    };
  }
};
