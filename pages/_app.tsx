import apolloClient from '@/lib/apollo'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloProvider>
  )
}
