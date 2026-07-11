import '@/styles/tailwind.css'
import 'focus-visible'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
