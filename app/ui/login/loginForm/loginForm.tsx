'use client'
import styles from './loginForm.module.css'
import { authenticate } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

const LoginForm = () => {
  const [err, formAction] = useFormState(authenticate, undefined)

  return (
      <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder='Username' name='username'/>
      <input type="password" placeholder='Password' name='password'/>
      <button type='submit'>Login</button>
      {err && err}
    </form>
  )
}

export default LoginForm