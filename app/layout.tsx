import Link from "next/link";
import React from "react";
export const dynamic = "force-dynamic";
import Provider from "@/utils/Provider";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./globals.css";

const NavBar: React.FC = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
                <div className="text-white text-2xl font-extrabold tracking-wide hover:scale-110 transition-transform cursor-pointer">
                    EMS
                </div>
            </Link>
            <div className="flex space-x-6">
                <Link href="/">
                    <div className="text-white text-lg hover:text-gray-200 transition-colors">
                        Home
                    </div>
                </Link>
                <Link href="/todos">
                    <div className="text-white text-lg hover:text-gray-200 transition-colors">
                        Todo Lists
                    </div>
                </Link>
                <Link href="/events">
                    <div className="text-white text-lg hover:text-gray-200 transition-colors">
                        Events
                    </div>
                </Link>
            </div>
        </div>
    </nav>
);

const Footer: React.FC = () => (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} EMS. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                >
                    <FaFacebook size={20} />
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                >
                    <FaTwitter size={20} />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                >
                    <FaLinkedin size={20} />
                </a>
            </div>
        </div>
    </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <html lang="en">
        <body className="bg-gray-50">
            <Provider>
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <main className="container mx-auto mt-8 flex-1 px-4 md:px-0">
                        {children}
                    </main>
                    <Footer />
                </div>
            </Provider>
        </body>
    </html>
);

export default Layout;
