import axios from 'axios'
import { compileFunction } from 'vm'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})