// import  { useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';

// import { Link, useNavigate } from 'react-router-dom';


// const Login = () => {
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     })
//     const [showPassword, setShowPassword] = useState(false)
   

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(data).every(el => el)


//     const handleSubmit = async(e)=>{
//         e.preventDefault()




//     }
//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
//                 <p className='text-2xl font-bold'>
//                     Welcome Back to 

//                     <span className='text-green-600'> Groovo</span>
//                 </p>
//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                     <div className='grid gap-1'>
//                         <label htmlFor='email'>Email :</label>
//                         <input
//                             type='email'
//                             id='email'
//                             className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
//                             name='email'
//                             value={data.email}
//                             onChange={handleChange}
//                             placeholder='Enter your email'
//                         />
//                     </div>
//                     <div className='grid gap-1'>
//                         <label htmlFor='password'>Password :</label>
//                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id='password'
//                                 className='w-full outline-none'
//                                 name='password'
//                                 value={data.password}
//                                 onChange={handleChange}
//                                 placeholder='Enter your password'
//                             />
//                             <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
//                                 {
//                                     showPassword ? (
//                                         <FaRegEye />
//                                     ) : (
//                                         <FaRegEyeSlash />
//                                     )
//                                 }
//                             </div>
//                         </div>
//                         <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password ?</Link>
//                     </div>
    
//                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

//                 </form>

//                 <p>
//                     Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default Login

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">G</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
              <p className="text-slate-500">
                Sign in to <span className="text-emerald-600 font-semibold">Groovo</span>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-800 placeholder:text-slate-400"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-slate-800 placeholder:text-slate-400"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <a
                    href="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={!valideValue}
                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 group ${
                  valideValue
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Login
                {valideValue && (
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <a href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">Protected by enterprise-grade security</p>
      </div>
    </section>
  );
};

export default Login;
