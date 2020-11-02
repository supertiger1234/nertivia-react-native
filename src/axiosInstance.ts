import Axios, {AxiosResponse} from 'axios';

const instance = Axios.create({
  baseURL: 'https://supertiger.tk/api/',
});

export default instance;

interface LoginResponse {
  token: string;
}

export function postLogin(
  email: string,
  password: string,
  token: string,
): Promise<AxiosResponse<LoginResponse>> {
  return instance.post('user/login', {email, password, token});
}
