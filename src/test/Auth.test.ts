import request from 'supertest'
import { app } from '../server'

describe('POST /v1/auth/register', ()=> {
  test('Registering User Testing', async () =>{
    const response = await request(app).post('/v1/auth/register').send({
      'name':'Sukhbir',
      'email':'sukhbir@nexgeniots.com', 
      'password':'password',
    })
    if(response.statusCode === 400){
      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('User already exists')
    } else {
      expect(response.body.success).toBe(true)
      expect(response.body.error).toBe('Account created succesfully')
    }
  })

  test('Without Password Regsiter Testing', async () =>{
    const response = await request(app).post('/v1/auth/register').send({
      'name':'Sukhbir',
      'email':'sukhbir@nexgeniots.com',
    })
    
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('Add Password to register')
  })

  test('Without Email Register Testing', async () =>{
    const response = await request(app).post('/v1/auth/register').send({
      'name':'Sukhbir',
      'password':'password',
    })
    
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('Add email to register')
  })
})


describe('POST /v1/auth/login', ()=> {
  test('Login User Testing', async () =>{
    const response = await request(app).post('/v1/auth/login').send({
      'email':'sukhbir@nexgeniots.com', 
      'password':'password',
    })
    expect(response.body.success).toBe(true)
    expect(response.body.accessToken).toBeTruthy()

    const testResponse = await request(app).get('/v1/auth/test').set('authorization', 'Bearer ' + response.body.accessToken)
    expect(testResponse.body.success).toBe(true)

  })

  test('Without Password Login Testing', async () =>{
    const response = await request(app).post('/v1/auth/login').send({
      'email':'sukhbir@nexgeniots.com',
    })
    
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('password required')
  })

  test('Without Email login', async () =>{
    const response = await request(app).post('/v1/auth/login').send({
      'password':'password',
    })
    
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error).toBe('Add email to register')
  })
})


describe('GET /v1/auth/refresh', ()=> {
  test('Login User Testing', async () =>{
    const loginResponse = await request(app).post('/v1/auth/login').send({
      'email':'sukhbir@nexgeniots.com', 
      'password':'password',
    })
    const refreshResponse = await request(app).get('/v1/auth/refresh').set('refreshtoken', loginResponse.body.refreshToken)
    expect(refreshResponse.body.success).toBe(true)
    expect(refreshResponse.body.accessToken).toBeTruthy()

    const testResponse = await request(app).get('/v1/auth/test').set('authorization', 'Bearer ' + refreshResponse.body.accessToken)
    expect(testResponse.body.success).toBe(true)  })
})