// components/Layout.tsx
import { MainNav } from '@/components/sophon/layout/components/main-nav';
import { Search } from '@/components/sophon/layout/components/search';
import TeamSwitcher from '@/components/sophon/layout/components/team-switcher';
import { UserNav } from '@/components/sophon/layout/components/user-nav';
import { Web3ReactProvider } from '@web3-react/core';
import React, { ReactNode } from 'react';
import { ethers } from 'ethers';
interface LayoutProps {
    children: ReactNode;
}
const getLibrary = (provider: any) => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = 8000 // frequency provider is polling
    return library
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
        <div className="bg-resumers-drak flex flex-col min-h-screen overflow-y-hidden">
            <header className="bg-resumers-drak flex-shrink-0">
                <div className="">
                    <div className="flex h-16 items-center px-4">
                        {/* <TeamSwitcher /> */}
                        {/* <MainNav className="mx-6" /> */}
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
            </header>
            <main className='flex-grow container mx-auto items-center p-4'>
                {children}
            </main>
                

            {/* <footer className="flex-shrink-0 border-t border-solid border-gray-200 px-6 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h3 className="text-lg">Your Company</h3>
                        <p>© 2023 Your Company, All rights reserved.</p>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#privacy">Privacy</a></li>
                        </ul>
                    </nav>
                </div>
            </footer> */}
        </div>
        </Web3ReactProvider>
    );
};


export default Layout;
