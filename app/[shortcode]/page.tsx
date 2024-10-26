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
        where: { shortCode: shortcode },
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

    if (url.password) {
        return (
            <div className="bg-[url('../public/background.svg')] min-h-screen">
                <div className="mx-auto max-w-6xl py-12 md:py-24 space-y-6 p-12 ">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl md:text-4xl font-bold py-4 bg-gradient-to-r from-blue-700 to-pink-500 inline-block text-transparent bg-clip-text">
                            Shorten Your Long Links
                        </h1>
                        <h1 className="text-neutral-400">
                            Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experiences.
                        </h1>
                        <h1 className="text-neutral-400">
                            This Link has been protected, please enter the password to access the original URL.
                        </h1>
                    </div>
                    <PasswordForm
                        url={{
                            originalUrl: url.originalUrl,
                            password: url.password,
                            id: url.id,
                        }}
                    />
                    <Toaster position="top-center" />
                </div>
            </div>
        );
    } else {
        redirect(url.originalUrl);
    }
}
