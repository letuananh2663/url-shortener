"use client";

import Cookies from "js-cookie";
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import { ArrowRight, Clipboard, Eye, EyeClosed, Link } from 'lucide-react';

interface ShortenFormProps {
    handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
    const { user, isSignedIn } = useUser();
    const [url, setUrl] = useState<string>('');
    const [urlCount, setUrlCount] = useState<number>(0);
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [customShortCode, setCustomShortCode] = useState<string>('');

    useEffect(() => {
        const count = Cookies.get('urlCount') ? parseInt(Cookies.get('urlCount') as string) : 0;
        setUrlCount(count);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!isSignedIn && urlCount >= 5) {
            toast.error('You have reached the limit of 5 URLs. Please register to shorten more.');
            setIsLoading(false);
            return;
        }

        if (customShortCode.length !== 0 && customShortCode.length !== 8) {
            toast.error('Custom short code must be exactly 8 characters.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    expirationDate,
                    password,
                    customShortCode,
                    userId: isSignedIn ? user.id : null,
                    ipAddress: !isSignedIn ? await getIpAddress() : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Something went wrong!');
                return;
            }

            const newCount = urlCount + 1;
            setUrlCount(newCount);
            Cookies.set('urlCount', newCount.toString(), { expires: 1 });

            const expirationMessage = expirationDate
                ? `It will expire on ${new Date(expirationDate).toLocaleString()}`
                : '';

            setUrl('');
            setPassword('');
            handleUrlShortened();
            setExpirationDate('');
            setCustomShortCode('');
            toast.success(`URL shortened successfully! ${expirationMessage}`);
        } catch (error) {
            console.error('Error shortening URL: ', error);
            toast.error('Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    };

    const getIpAddress = async (): Promise<string | null> => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Failed to fetch IP address:', error);
            toast.error('Could not retrieve your IP address');
            return null;
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setUrl(clipboardText);
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
            toast.error('Failed to paste from clipboard');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='space-y-4 text-center'>
                <div className="relative">
                    <Link className="w-4 h-4 text-neutral-300 absolute left-4 bottom-1/3" />
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className='pl-12 h-12 rounded-full text-neutral-400'
                        type='url'
                        placeholder='Enter the link here'
                        required
                    />
                    <Button type="button" onClick={handlePaste} className="p-[10px] bg-blue-600 hover:bg-blue-600/50 absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none rounded-full">
                        <Clipboard className="w-4 h-4 text-neutral-300" />
                    </Button>
                </div>
                <div className="relative">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-12 rounded-full text-neutral-400 pl-4'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Set a password (optional)'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? <EyeClosed className='w-4 h-4 text-neutral-400' /> : <Eye className='w-4 h-4 text-neutral-400' />}
                    </button>
                </div>
                <Input
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className='h-12 rounded-full text-neutral-400 pl-4'
                    type='date'
                />
                <Input
                    value={customShortCode}
                    onChange={(e) => setCustomShortCode(e.target.value.slice(0, 8))}
                    className='h-12 rounded-full text-neutral-400 pl-4'
                    type='text'
                    placeholder='Custom short code (8 characters)'
                    maxLength={8}
                />
                <Button className='w-1/2 p-2 text-neutral-300 bg-blue-600 hover:bg-blue-600/50' type='submit' disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten URL'}
                    <ArrowRight className='w-4 h-4' />
                </Button>
            </div>
        </form>
    );
}
