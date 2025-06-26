// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();
// const API_URL = process.env.NEXTAUTH_URL;
// if (!API_URL) {
//     console.log('No API URL found');
//     process.exit(1);
// }
// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })


// api.interceptors.response.use(
//   (response) => response, // Return response normally
//   async (error) => {
//     if (error.response?.status === 403) {
//       const success = await refreshAccessToken();
//       if (success) {
//         return api.request(error.config); // Retry original request
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const logout = async () => {
    
//   await axios.get(`${API_URL}/logout`, { withCredentials: true });}

//   export const refreshAccessToken = async (): Promise<boolean> => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/refreshtoken', {
//         method: 'POST',
//         credentials: 'include', // Important for sending cookies
//       });
  
//       if (!response.ok) throw new Error('Failed to refresh token');
//       return true; // Indicating refresh was successful
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       return false; // Indicating refresh failed
//     }
//   };
  

//   export const getProtecedpage = async () => {
//     try {
//       const { data } = await axios.get(`${API_URL}/aboutus`, { withCredentials: true });
//       return data.user;
//     } catch {
//       return null;
//     }
//   };
  
//   export default api;