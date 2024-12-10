const BASE_URL = 'https://seraphic-camera-436421-v8.uc.r.appspot.com/api';
const config = {
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
    incomes: {
      basepath: `${BASE_URL}/incomes`,
    },
    metrics: {
      basepath: `${BASE_URL}/metrics/`,
    },
  },
};

export default config;
