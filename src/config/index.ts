interface ServiceConfig {
  basepath: string;
}

interface ApiConfig {
  [key: string]: ServiceConfig;
}

interface AppConfig {
  config: {
    api: ApiConfig;
  };
}

interface LocalConfig {
  dev: AppConfig;
}

const BASE_URL = 'https://seraphic-camera-436421-v8.uc.r.appspot.com/api';
const localConfig: LocalConfig = {
  dev: {
    config: {
      api: {
        auth: {
          basepath: `${BASE_URL}/auth`,
        },
        products: {
          basepath: `${BASE_URL}/products`,
        },
        sales: {
          basepath: `${BASE_URL}/sales`,
        },
      },
    },
  },
};

export default localConfig;
