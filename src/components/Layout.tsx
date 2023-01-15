import React, { ReactNode } from 'react'
import Footer from './Footer'

const Layout = ({children} : {children: ReactNode}) => {
  return (
    <div className='w-full bg-gray-700 flex flex-col'>
        <header className='p-6 text-white'>
            <h1 className='text-2xl font-bold'>What's your plan today?</h1>
        </header>
        <div className='w-full min-h-[70vh]'>
            {children}
        </div>
        <Footer 
                github="https://github.com/janevalencia/fem-rest-countries" 
                linkedin="https://www.linkedin.com/in/janevalencia"
                instagram="https://www.instagram.com/janevlencia"
                medium="https://medium.com/@janevalencia"
            />
    </div>
  )
}

export default Layout