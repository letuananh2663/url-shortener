"use client"

import Link from 'next/link'
import { Button } from './ui/button'
import React, { useEffect, useState } from 'react'
import { Check, CopyIcon, EyeIcon } from 'lucide-react'

type Url = {
    id: string;
    shortCode: string;
    originalUrl: string;
    visits: number
}
export default function UrlList() {
    const [urls, setUrls] = useState<Url[]>([]);
    const [copyUrl, setCopyUrl] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const shortenerUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

    const fetchUrls = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/urls');
            const data = await response.json();
            setUrls(data);
        } catch (error) {
            console.error('Error fetching URLs', error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleCopyUrl = (code: string) => {
        const fullUrl = `${shortenerUrl(code)}`;
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true);
            setCopyUrl(code);
            setTimeout(() => {
                setCopied(false);
                setCopyUrl('');
            }, 3000);
        })
    }

    useEffect(() => {
        fetchUrls();
    }, []);

    if (urls.length === 0) {
        return
    }

    if (isLoading) {
        return (
            <div className='animate-pulse'>
                <div className='h-8 bg-gray-200 rounded w-1/4 mb-4'></div>
                <div className='space-y-2'>
                    {[1, 2, 3].map((num) => (
                        <div key={num} className='flex items-center justify-between bg-gray-900 px-6 py-3 mb-[2px] rounded'>
                            <div className='h-4 bg-gray-200 rounded w-3/5'></div>
                            <div className='flex items-center space-x-2'>
                                <div className='h-5 w-5 bg-gray-200 rounded'></div>
                                <div className='h-4 w-4 bg-gray-200 rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-700 pt-6 rounded-t-2xl rounded-b-lg w-96 sm:w-full relative">
                <h2 className="pl-6 text-lg font-semibold mb-4 text-neutral-300">Shorten Links</h2>
                <div className="relative overflow-hidden rounded-b-lg">
                    {urls.map((url) => (
                        <div key={url.id} className="flex items-center justify-between bg-gray-900 px-6 py-3 mb-[2px]">
                            <Link href={`/${url.shortCode}`} target='_blank' className='text-neutral-300 w-3/5 overflow-hidden whitespace-nowrap text-ellipsis'>
                                {shortenerUrl(url.shortCode)}
                            </Link>
                            <Link href={url.originalUrl} target='_blank' className='text-neutral-300 w-3/5 overflow-hidden whitespace-nowrap text-ellipsis hidden sm:block'>
                                {url.originalUrl}
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted/10' onClick={() => handleCopyUrl(url.shortCode)}>
                                    {copied && copyUrl === url.shortCode ? (
                                        <Check className='w-4 h-4 text-neutral-300' />
                                    ) : (
                                        <CopyIcon className='w-4 h-4 text-neutral-300' />
                                    )}
                                    <span className='sr-only'>Copy to Clipboard</span>
                                </Button>
                                <span className='flex items-center gap-2 text-neutral-300'>
                                    <EyeIcon className='w-4 h-4 text-neutral-300' />
                                    {url.visits}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="absolute rounded-b-lg bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    )
}