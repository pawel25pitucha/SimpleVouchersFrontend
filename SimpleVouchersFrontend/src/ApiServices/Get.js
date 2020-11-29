

  const makeGetAllRequest=() => {
        
    axios.get('https://localhost:5001/api/Customers')
      .then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });

  }

export default makeGetAllRequest;