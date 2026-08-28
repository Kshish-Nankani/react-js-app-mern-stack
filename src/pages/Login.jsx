import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Alert from '../components/Alert'
import '../styles/auth.css'

const Login=()=>{
     const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState('')
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
             const res = await fetch('/api/auth/login',{
                method:'POST',
                headers: {'content-Type' : 'application/json'},
                body: JSON.stringify({email, password})
          }  )
          const data = await res.json();
          if(res.ok){
            login(data)
            navigate('/')
          }
          else{
            setError(data.message)
          }
        } catch (error) {
            setError('Unable to connect to the server. Please try again.')
        }
    }
    return(
    <div className='auth-container'>
        <form onSubmit={handleSubmit} className='auth-form'>
       <h2>Login</h2>
      {error && <Alert>{error}</Alert>}
       <input type="email" placeholder='Email' 
       value={email} onChange={(e)=>setEmail(e.target.value)} required />
      
        <input type="password" placeholder='Password' 
       value={password} onChange={(e)=>setPassword(e.target.value)} required />


     <button type="submit" className='btn'>Login</button>
     <p>Don't have an Account?<Link to="/register"> Register</Link></p>

        </form>
    </div>
    )
}
export default Login;
