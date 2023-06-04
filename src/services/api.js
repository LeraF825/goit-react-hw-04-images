import axios from 'axios';

const API_KEY = '36214859-9a36ec77f3d5f2e4fe5aa554f';
axios.defaults.baseURL = 'https://pixabay.com/';
export const getSearchImages = async (queri, page=1) => {
    const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: queri,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  })
  return response.data;
};
