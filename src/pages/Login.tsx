import React, { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { User, useAuth } from 'context/AuthContext';

const Login: React.FC = () => {
  const { token, error, login, logout } = useAuth()
  const [user, setUser] = useState<User>(
    {
      name: '',
      password: ''
    }
  )

  const navigate = useNavigate();
  const redirectPath = '/';

  const handleLogin = () => {
    login({
      name: user.name,
      password: user.password
    });
  }

  if(token) navigate(redirectPath, { replace: true });
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url('/public/background2.svg')] min-h-screen overflow-hidden">
      <div className="bg-gray-800 bg-opacity-50 px-16 py-10 backdrop-blur-md max-sm:px-8 border-[3px] border-dashed rounded-2xl transform transition duration-300 hover:scale-110 shadow-lg">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src="https://www.seam.money/images/logo.png" width="150" alt="" />
            <h1 className="mb-2 text-2xl">Seam Plus</h1>
          </div>
          {error && <div className="text-red text-center mb-5">{error}</div>}
          <div className="mb-4 text-lg">
            <input className="text-black rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value })} placeholder="your name" />
          </div>
          <div className="mb-4 text-lg">
            <input className="text-black rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="*********" />
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
            <button onClick={handleLogin} type="submit" className="border-[3px] border-dashed rounded-3xl bg-yellow-400 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
          </div>
          <div className="mt-4 flex justify-center text-lg text-white">
            <p>Or</p>
          </div>
          <div className="mt-2 flex justify-center text-lg text-white underline">
            <Link to='/register'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;