"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function ShortenForm() {
    const [url, setUrl] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                }),
            });
            await response.json();
            setUrl('');
        } catch (error) {
            console.error('Error shortening URL: ', error);
        } finally {

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
                    required />
                <Button className='w-full p-2' type='submit'>Shorten URL</Button>
            </div>
        </form>
    )
}
