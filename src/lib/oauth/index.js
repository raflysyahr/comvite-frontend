import ax from 'axios';

const axios = ax.create({
  withCredentials:true
})

async function onSignin(email, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8000/api/v1/auth/signin', { email, password })
      .then((values) => {
        resolve({ data:values.data,error:null})
      }).catch((error) => {
        reject({ data:null,error:error.response})
      })
  })
}


async function onSignup({ username, name, email, password }) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:800/api/v1/auth/signup', { username, name, email, password })
      .then((values) => resolve({ data:values.data,error:null }))
      .catch((error) => reject({ data:null,error:error.response }))
  })
}



async function onSignout() {
  return new Promise((resolve, reject) => {
    axios.delete('http://localhost:800/api/v1/auth.signout')
      .then((values) => resolve({ data:values.data,error:null }))
      .catch((error) => reject({ data:null,error:error.response }))
  })
}

export {
  onSignin,
  onSignout,
  onSignup
}
