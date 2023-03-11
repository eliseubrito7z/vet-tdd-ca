import { Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import dog404 from 'presentation/Assets/dog-404.svg'

export default function Custom404() {
  return (
    <VStack>
      <Image alt="Página não encontrada" src={dog404} />
    </VStack>
  )
}
