/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path';
import url from 'url';

// con ESModules no se puede utilizar __dirname, ni __pathname, por lo que este método reemplazaría a las variables globales
// Se debe usar de esta manera en el archivo local -> currentDir(import.meta.url)

const currentDir = (fileUrl: string) => {
  const __filename = url.fileURLToPath(fileUrl);
  return path.dirname(__filename);
};

export default currentDir;
