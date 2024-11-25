import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Topbar from "@/components/organisms/layout/topbar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'BINASRepotask',
    description: 'Repository Tugas Akhir Akademi Manajemen Informatika Bina Sriwijaya',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = cookies().get('user-session')?.value


    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/binas-logo.png" />
            </head>
            <body className={inter.className}>
                <Topbar session={session} />
                <main>{children}</main>
            </body>
        </html>
    )
}
