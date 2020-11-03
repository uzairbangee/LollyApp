import React from 'react'
import Header from "./Header"

interface Props {
    
}

const Layout = ({children}) => {
    return (
        <div className="container">
            <Header />
            <p>Customize and Order your Favourite Popsticle Sticks</p>
            {children}
        </div>
    )
}

export default Layout
