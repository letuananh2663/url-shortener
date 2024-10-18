"use client";

import Cookies from "js-cookie";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Eye, EyeClosed } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PasswordFormProps {
    url: { originalUrl: string; password: string; id: string };
}

const PasswordForm: React.FC<PasswordFormProps> = ({ url }) => {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const authenticated = Cookies.get(`auth-${url.id}`);
        if (authenticated) {
            console.log("User is authenticated.");
            window.location.href = url.originalUrl;
        } else {
            console.log("User is not authenticated.");
        }
    }, [url.id, url.originalUrl]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, id: url.id }),
            });

            if (res.ok) {
                Cookies.set(`auth-${url.id}`, "true", { expires: 1 / 288 });

                const data = await res.json();
                window.location.href = data.redirect;
            } else {
                const data = await res.json();
                if (res.status === 401) {
                    toast.error(data.message);
                }
            }
            setPassword('');
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='space-y-4'>
                <div className="relative">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='h-12'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? <EyeClosed className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                </div>
                <Button className='w-full p-2' type='submit' disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PasswordForm;
