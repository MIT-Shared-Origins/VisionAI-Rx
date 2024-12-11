import axios from 'axios';

// 配置基础 URL
axios.defaults.baseURL = 'http://localhost:8080';  // 后端 Spring Boot 默认端口
axios.defaults.withCredentials = true;  // 如果需要发送凭证（例如 cookies）

// 可以根据需要添加其他配置，如请求拦截器、响应拦截器等

export default axios;
