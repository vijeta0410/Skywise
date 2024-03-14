//Button.tsx
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div className="flex flex-row gap-4 justify-center font-bold">
      <button className="  shadow-xl py-2 px-7 border  rounded-lg hover:scale-125 transition duration-150 ease-in-out"><Link to="/destinations/chill">Chill</Link></button>
      <button  className=" shadow-xl py-2 px-7 border rounded-lg hover:scale-125 transition duration-150 ease-in-out"><Link to="/destinations/sunny">Sunny</Link></button>
      <button  className=" shadow-xl py-2 px-7 border rounded-lg hover:scale-125 transition duration-150 ease-in-out"><Link to="/destinations/cloudy">Cloudy</Link></button>
      <button  className=" shadow-xl py-2 px-7 border rounded-lg hover:scale-125 transition duration-150 ease-in-out"><Link to="/destinations/rainy">Rainy</Link></button>
      <button  className=" shadow-xl py-2 px-7 border rounded-lg hover:scale-125 transition duration-150 ease-in-out"><Link to="/destinations/snowy">Snowy</Link></button>
    </div>
  )
}

export default Button