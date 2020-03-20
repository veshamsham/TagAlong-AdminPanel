/* eslint-disable prettier/prettier */
import axios from "axios";
export default axios.create({
  //baseURL: "http://localhost:8000/",
  baseURL: "https://api.tagalongride.com/",
  timeout: 100000
});

//  axios.create({
//   baseURL: '<your-api>',
//   headers: {
//     Authorization: {
//       toString () {
//         return `Bearer ${localStorage.getItem('token')}`
//       }
//     }
//   }
// })
