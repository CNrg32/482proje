import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

// Yükleme yönlendirmesini client-side only olarak dinamik yükle
const InstallPromptManager = dynamic(
  () => import('@/components/InstallPromptManager'),
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Component {...pageProps} />
      <InstallPromptManager />
    </div>
  )
}