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

    if (isLoading) {
        return (
            <div>
                <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
                <ul className='space-y-2 md:hidden'>
                    {urls.map((url) => (
                        <li key={url.id} className='flex justify-between items-center gap-2'>
                            <Link href={`/${url.shortCode}`} target='_blank' className='text-blue-500'>
                                {shortenerUrl(url.shortCode)}
                            </Link>
                            <div className='flex items-center gap-2'>
                                <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopyUrl(url.shortCode)}>
                                    {copied && copyUrl == url.shortCode ? (
                                        <Check className='w-4 h-4' />
                                    ) : (
                                        <CopyIcon className='w-4 h-4' />
                                    )}
                                    <span className='sr-only'>Copy to Clipboard</span>
                                </Button>
                                <span className='flex items-center gap-2'>
                                    <EyeIcon className='w-4 h-4' />
                                    {url.visits}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <table className='min-w-full hidden md:table'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2 text-left'>Original URL</th>
                            <th className='px-4 py-2 text-left'>Shortened URL</th>
                            <th className='px-4 py-2 text-left'></th>
                            <th className='px-4 py-2 text-left'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url.id} className='border-b'>
                                <td className='px-4 py-2'>
                                    <Link href={url.originalUrl} target='_blank' className='text-blue-500'>
                                        {url.originalUrl}
                                    </Link>
                                </td>
                                <td className='px-4 py-2'>
                                    <Link href={`/${url.shortCode}`} target='_blank' className='text-blue-500'>
                                        {shortenerUrl(url.shortCode)}
                                    </Link>
                                </td>
                                <td className='px-4 py-2'>
                                    <span className='flex items-center gap-2'>
                                        <EyeIcon className='w-4 h-4' />
                                        {url.visits}
                                    </span>
                                </td>
                                <td className='px-4 py-2'>
                                    <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopyUrl(url.shortCode)}>
                                        {copied && copyUrl === url.shortCode ? (
                                            <Check className='w-4 h-4' />
                                        ) : (
                                            <CopyIcon className='w-4 h-4' />
                                        )}
                                        <span className='sr-only'>Copy to Clipboard</span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
            <ul className='space-y-2 md:hidden'>
                {urls.map((url) => (
                    <li key={url.id} className='flex justify-between items-center gap-2'>
                        <Link href={`/${url.shortCode}`} target='_blank' className='text-blue-500'>
                            {shortenerUrl(url.shortCode)}
                        </Link>
                        <div className='flex items-center gap-2'>
                            <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopyUrl(url.shortCode)}>
                                {copied && copyUrl == url.shortCode ? (
                                    <Check className='w-4 h-4' />
                                ) : (
                                    <CopyIcon className='w-4 h-4' />
                                )}
                                <span className='sr-only'>Copy to Clipboard</span>
                            </Button>
                            <span className='flex items-center gap-2'>
                                <EyeIcon className='w-4 h-4' />
                                {url.visits}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <table className='min-w-full hidden md:table'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-4 py-2 text-left'>Original URL</th>
                        <th className='px-4 py-2 text-left'>Shortened URL</th>
                        <th className='px-4 py-2 text-left'></th>
                        <th className='px-4 py-2 text-left'></th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id} className='border-b'>
                            <td className='px-4 py-2'>
                                <Link href={url.originalUrl} target='_blank' className='text-blue-500'>
                                    {url.originalUrl}
                                </Link>
                            </td>
                            <td className='px-4 py-2'>
                                <Link href={`/${url.shortCode}`} target='_blank' className='text-blue-500'>
                                    {shortenerUrl(url.shortCode)}
                                </Link>
                            </td>
                            <td className='px-4 py-2'>
                                <span className='flex items-center gap-2'>
                                    <EyeIcon className='w-4 h-4' />
                                    {url.visits}
                                </span>
                            </td>
                            <td className='px-4 py-2'>
                                <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopyUrl(url.shortCode)}>
                                    {copied && copyUrl === url.shortCode ? (
                                        <Check className='w-4 h-4' />
                                    ) : (
                                        <CopyIcon className='w-4 h-4' />
                                    )}
                                    <span className='sr-only'>Copy to Clipboard</span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
