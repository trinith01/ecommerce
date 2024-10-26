import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faWhatsapp ,faFacebook} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='px-[15%] bg-gradient-to-r from-slate-900 to-slate-700 pt-8 pb-2'>
      <div className='flex gap-20 w-full justify-between'>
        <div className='items-center justify-start max-w-[25rem]'>
          <Link className="text-4xl font-bold no-underline hover:no-underline bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 bg-clip-text text-transparent hover:text-transparent" to="/">
            C-Express
          </Link>
          <p className='bg-transparent text-white mt-4 text-sm'>At C-Express, we are committed to delivering high-quality products at unbeatable prices. Shop from a wide range of categories and enjoy fast, reliable shipping.</p>
        </div>
        <div className="items-center justify-start max-w-[20rem]">
          <h3 className='bg-transparent text-white'>Quick Links</h3>
          <div className='text-left text-sm flex flex-col mt-4'>
            <Link to='/categories/Electronics/products' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Electronics</Link>
            <Link to='/categories/Toys/products' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Toys</Link>
            <Link to='/categories/Fashion/products' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Fashion</Link>
            <Link to='/categories/Home Appliances/products' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Home Appliances</Link>
            <Link to='/categories/Books/products' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Books</Link>
          </div>
        </div>
        <div>
          <h3 className='bg-transparent text-white'>Contact Us</h3>
          <p className='text-left text-sm bg-transparent text-white mt-6'>Email: Cexpress@gmail.com</p>
          <p className='text-left text-sm bg-transparent text-white'>Phone: +1 (415) 555-0198</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <h3 className='bg-transparent text-white text-sm'>&copy; 2024, All Rights Reserved. C-Express 2024</h3>
      </div>
      <div className="flex justify-center mt-6 space-x-6">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full hover:bg-purple-500 transition duration-200">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://wa.me/940769940455" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full hover:bg-green-500 transition duration-200">
          <FontAwesomeIcon icon={faWhatsapp} size="2x" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full hover:bg-blue-600 transition duration-200">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
