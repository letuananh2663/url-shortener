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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const authenticated = Cookies.get(`auth-${url.id}`);
        if (authenticated) {
            const timestamp = parseInt(authenticated);
            const now = Date.now();
            if (now - timestamp < 5 * 60 * 1000) {
                window.location.href = url.originalUrl;
            } else {
                Cookies.remove(`auth-${url.id}`);
            }
        }
    }, [url.id, url.originalUrl]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, id: url.id }),
            });

            if (res.ok) {
                const data = await res.json();
                const expirationTimestamp = Date.now().toString();
                Cookies.set(`auth-${url.id}`, expirationTimestamp, { expires: 1 / (24 * 60), path: '/' });
                window.location.href = data.redirect;
            } else {
                const data = await res.json();
                if (res.status === 401) {
                    toast.error(data.message);
                }
            }
            setPassword("");
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="space-y-4 text-center">
                <div className="relative">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 rounded-full text-neutral-400 pl-4 bg-transparent"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeClosed className="w-4 h-4 text-neutral-400" />
                        ) : (
                            <Eye className="w-4 h-4 text-neutral-400" />
                        )}
                    </button>
                </div>
                <Button className="w-1/2 p-2 text-neutral-300 bg-blue-600 hover:bg-blue-600/50" type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PasswordForm;