import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { CopyIcon, EyeIcon } from 'lucide-react'

export default function UrlList() {
    return (
        <div>
            <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
            <ul className='space-y-2'>
                <li className='flex justify-between items-center gap-2'>
                    <Link href='https://github.com/letuananh2663' target='_blank' className='text-blue-500'>
                        https://github.com/letuananh2663
                    </Link>
                    <div className='flex items-center gap-2'>
                        <Button variant="ghost" size='icon' className='text-muted-foreground hover:bg-muted'>
                            <CopyIcon className='w-4 h-4' />
                            <span className='sr-only'>Copy to Clipboard</span>
                        </Button>
                        <span className='flex items-center'>
                            <EyeIcon className='w-4 h-4' />
                            1 views
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    )
}
