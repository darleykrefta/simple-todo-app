import React from 'react'

import { RecoilRoot } from 'recoil'

import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: '#590202',
    secondary: '#F26D3D',
    background: '#84BF9E'
  }
})

export const Providers: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <CSSReset />
        {children}
      </RecoilRoot>
    </ChakraProvider>
  )
}
