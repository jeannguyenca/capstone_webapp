const login = (email, password) => {
  return {
    query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
  }
}


export default login