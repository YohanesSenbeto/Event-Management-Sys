import Link from "next/link";
import React from "react";
import Provider from "@/utils/Provider";
import "./globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div>
                        <nav className="bg-gray-800 p-4">
                            <div className="container mx-auto flex justify-between items-center">
                                <div className="text-white text-lg font-bold">
                                    My App
                                </div>
                                <div className="flex">
                                    <Link href="/">
                                        <div className="text-white mr-4">
                                            Home
                                        </div>
                                    </Link>
                                    <Link href="/todos">
                                        <div className="text-white mr-4">
                                            Todos
                                        </div>
                                    </Link>
                                    <Link href="/events">
                                        <div className="text-white">Events</div>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                        <main className="container mx-auto mt-4">
                            {children}
                        </main>
                    </div>
                </Provider>
            </body>
        </html>
    );
};

export default Layout;
