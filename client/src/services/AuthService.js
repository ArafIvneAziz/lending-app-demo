class AuthService {
  static async login(email, password) {
    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }

  static async register(email, password) {
    const response = await fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }
}

export default AuthService;



// static async logout() {
//   const response = await fetch('/api/logout', { // replace with real API endpoint
//     method: 'POST',
//   });

//   if (!response.ok) {
//     throw new Error('Failed to log out');
//   }
// }
/*
This AuthService class provides three static methods: login, logout, and register. These methods make requests to a hypothetical API at /api/login, /api/logout, and /api/register, respectively.

The login and register methods expect a username and password and return the response data if the request was successful. If the request was not successful (i.e., the response status was not OK), they throw an error.

The logout method does not expect any arguments and does not
*/