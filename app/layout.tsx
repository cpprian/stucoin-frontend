import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from "next-auth/react"
import { auth } from '@/auth'
import { EdgeStoreProvider } from '@/lib/edgestore'
import { ModalProvider } from '@/components/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stucoin',
  description: 'Make a next step in your career with a real proof of your abilities.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <EdgeStoreProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='stucoin-platform'
            >
              <Toaster />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </EdgeStoreProvider>
    </SessionProvider>
  )
}
