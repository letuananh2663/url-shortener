import prisma from "@/lib/db";
import ErrorPage from "./error";
import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import PasswordForm from "@/components/password-form";

interface RedirectPageProps {
    params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const { shortcode } = params;

    const url = await prisma.url.findUnique({
        where: { shortCode: shortcode }
    });

    if (!url) {
        return <ErrorPage message="URL Not Found" />;
    }

    if (url.expirationDate && new Date() > url.expirationDate) {
        return <ErrorPage message="This Link Has Expired" />;
    }

    await prisma.url.update({
        where: { id: url.id },
        data: { visits: { increment: 1 } },
    });

    return (
        <div className="mx-auto max-w-6xl py-12 md:py-24 space-y-6 p-12">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl md:text-4xl font-bold">Enter Password</h1>
            </div>
            {url.password ? (
                <PasswordForm url={{
                    originalUrl: url.originalUrl,
                    password: url.password,
                    id: url.id
                }} />
            ) : (
                redirect(url.originalUrl)
            )}
            <Toaster position="top-center" />
        </div>
    );
}
