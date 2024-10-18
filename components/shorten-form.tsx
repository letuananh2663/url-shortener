"use client"

import { Input } from './ui/input'
import toast from 'react-hot-toast';
import { Button } from './ui/button'
import React, { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react';

interface ShortenFormProps {
    handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
    const [url, setUrl] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    expirationDate,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Something went wrong!');
                return;
            }

            const expirationMessage = expirationDate
                ? `It will expire on ${new Date(expirationDate).toLocaleString()}`
                : '';

            setUrl('');
            setPassword('');
            handleUrlShortened();
            setExpirationDate('');
            toast.success(`URL shortened successfully! ${expirationMessage}`);
        } catch (error) {
            console.error('Error shortening URL: ', error);
            toast.error('Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='space-y-4'>
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className='h-12'
                    type='url'
                    placeholder='Enter URL to shorten'
                    required
                />
                <div className="relative">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-12'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Set a password (optional)'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? <EyeClosed className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                </div>
                <Input
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className='h-12'
                    type='date'
                    placeholder='Select expiration date'
                />
                <Button className='w-full p-2' type='submit' disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten URL'}
                </Button>
            </div>
        </form>
    )
}
