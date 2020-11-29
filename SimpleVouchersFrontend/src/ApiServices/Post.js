
const makePostRequest=(data) => {
    
  axios.post('https://localhost:5001/api/Customers',JSON.stringify(data),{
    headers:{
        'Content-Type': 'application/json',
        'accept':'*/*'
    }})
    .then(res => {
      console.log(res);
  }).catch(error => {
      console.log(error);
  });
}
export default makePostRequest;