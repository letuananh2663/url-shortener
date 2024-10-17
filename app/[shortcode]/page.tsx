import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ErrorPage from "./error";

interface RedirectPageProps {
    params: { shortcode: string }
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

    redirect(url.originalUrl);
}
