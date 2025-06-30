import cloudinary from '../config/cloudinary.js';

const result = await cloudinary.uploader.upload(filePath, {
  folder: 'chattify',
  resource_type: 'auto',
});

const media = {
  public_id: result.public_id,
  url: result.secure_url,
};
