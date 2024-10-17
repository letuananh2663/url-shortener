"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import toast from 'react-hot-toast';

interface ShortenFormProps {
    handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
    const [url, setUrl] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || 'Something went wrong!');
                return;
            }

            setUrl('');
            setExpirationDate('');
            handleUrlShortened();
            toast.success(`URL shortened successfully! It will expire on ${new Date(expirationDate).toLocaleString()}`);
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
