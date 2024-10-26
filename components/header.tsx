"use client"

import { Button } from './ui/button';
import React, { useEffect } from 'react';
import { Loader, LogIn } from 'lucide-react';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const Header: React.FC = () => {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('userId', user.id);
        }
    }, [user]);
    return (
        <div className="container flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl font-bold py-4 bg-gradient-to-r from-blue-700 to-pink-500 inline-block text-transparent bg-clip-text">Linkly</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <ClerkLoading>
                            <Loader className='w-5 h-5 text-muted-foreground animate-spin' />
                        </ClerkLoading>
                        <ClerkLoaded>
                            <div className="flex self-center">
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                            <SignedOut>
                                <SignInButton
                                    mode="modal"
                                    fallbackRedirectUrl="/"
                                    signUpFallbackRedirectUrl="/"
                                >
                                    <Button className="text-neutral-300 rounded-full bg-[#353C4A] hover:bg-[#353C4A]/50 border border-neutral-400">
                                        <span className='flex items-center py-2'>
                                            Login
                                            <LogIn className='w-4 h-4 ml-1' />
                                        </span>
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </ClerkLoaded>
                    </li>
                    <li className='hidden sm:block'>
                        <SignedOut>
                            <SignUpButton
                                mode="modal"
                                fallbackRedirectUrl="/"
                            >
                                <Button className="text-neutral-300 rounded-full bg-[#144EE3] hover:bg-[#144EE3]/50">
                                    Register Now
                                </Button>
                            </SignUpButton>
                        </SignedOut>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;