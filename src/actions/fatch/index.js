/* eslint-disable prettier/prettier */
export default function PostData(type, userData) {
  //let BaseURL = "http://localhost:8000/";
  let BaseURL = "https://api.tagalongride.com/";

  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token")
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
