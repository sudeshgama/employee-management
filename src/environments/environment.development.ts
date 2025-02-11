export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3001',
    signIn: {
      apiUrl: '/signIn'
    },
    signUp: {
      apiUrl: '/employee'
    },
    employees: {
      apiUrl: '/api/employees'
    },
    tasks: {
      apiUrl: '/api/tasks'
    }
  }
};