import { useEffect, useState } from 'react'
import LockSVG from "../assets/lock-svgrepo-com.svg"
// import "./HomePage.css"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroText from './HeroText';

function HomePage() {
  const [user, setUser] = useState(null)
  const logout = async () => {
    localStorage.removeItem("user");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      method: "GET",
      credentials: "include"
    })
    if (response.ok) {
      navigate("/login");
      return;
    }
    alert("Something went wrong")
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  return (
    <>
      <div className="min-h-screen w-full bg-slate-950 relative text-white">
        {/* Moonlight Silver Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          radial-gradient(circle at 50% 50%, 
            rgba(203, 213, 225, 0.12) 0%, 
            rgba(203, 213, 225, 0.07) 25%, 
            rgba(203, 213, 225, 0.03) 35%, 
            transparent 50%
          )
        `,
            backgroundSize: "100% 100%",
          }}
        />
        <header className='flex justify-between px-7 py-4'>
          <div className='flex justify-between items-center xl:w-34'>
            <img src={LockSVG} alt="LockSVG" className='bg-cyan-400 p-2 rounded-lg' />
            <p className='font-bold text-white'>Vaultify</p>
          </div>
          <div className='flex justify-around items-center'>
            <ul className='flex justify-around xl:w-1xl items-center w-full h-full'>
              <li className='text-white hover:text-pink-500'><a href='#security'>Security</a></li>
              <li className='text-white hover:text-pink-500'><a href='#features'>Features</a></li>
              <li className='text-white hover:text-pink-500'><a href='/vault'>Vault</a></li>
            </ul>
            <div className='flex justify-around items-center h-full xl:w-2xs'>
              <Button size='large' asChild variant='outline' className="border-cyan-400 p-2 text-gray-500 bg-transparent text-cyan-400 hover:bg-transparent hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:ring-3 transition-all hover:text-cyan-400"><a href="/signup">Signup</a></Button>
              <Button className="order-cyan-400 p-2 text-black bg-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]" size='large'>Login</Button>
            </div>
          </div>
        </header>
        <main>
          <HeroText />
        </main>
      </div>
    </ >
  );
}
export default HomePage
