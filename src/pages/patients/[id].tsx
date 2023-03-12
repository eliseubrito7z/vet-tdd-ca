import { HStack, VStack } from '@chakra-ui/react'
import { DetailsCard } from 'presentation/components/Cards/DetailsCard'
import { PatientCard } from './components/PatientCard'
import { ServicesCard } from './components/ServicesCard'

export default function StaffDetails() {
  return (
    <VStack p="1rem 1rem 1rem 1.5rem" gap={4} w="100%">
      <HStack w="100%">
        <PatientCard />
        <DetailsCard />
      </HStack>

      <ServicesCard />
    </VStack>
  )
}
