import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constants/common';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dgrdmwvc4',
      api_key: '218483622866631',
      api_secret: 'ZpKHkoR6MpWye5zBORGKGYjNxtU',
    });
  },
};
