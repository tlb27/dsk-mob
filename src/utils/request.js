import axios from 'axios'

const token = 123
const service = axios.create({
  baseURL: '/', // api base_url
  timeout: 6000 // 请求超时时间
})

service.interceptors.request.use(config => {

    config.headers['token'] = token
  return config
})

export default service
