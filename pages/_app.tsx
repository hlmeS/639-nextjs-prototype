import React from 'react'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Component {...pageProps} />
}

export default MyApp
