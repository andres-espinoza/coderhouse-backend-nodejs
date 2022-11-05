/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import url from 'url';

const currentDir = (fileUrl: string) => {
  const __filename = url.fileURLToPath(fileUrl);
  return path.dirname(__filename);
};

export default currentDir;
