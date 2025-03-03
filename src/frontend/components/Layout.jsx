import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, padding: '20px' }}> 
                {children}
            </main>
            <Footer />
            <ScrollTop />
        </div>
    );
};

export default Layout;