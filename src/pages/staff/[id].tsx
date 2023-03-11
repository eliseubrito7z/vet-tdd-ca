import { Flex, HStack, VStack } from '@chakra-ui/react'
import { DetailsCard } from 'presentation/components/Cards/DetailsCard'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { RolesAndServicesCard } from './components/RolesAndServicesCard'
import { StaffCard } from './components/StaffCard'

export default function StaffDetails() {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
      <VStack p="1rem 1rem 1rem 1.5rem" w="100%">
        <HStack w="100%">
          <StaffCard />
          <DetailsCard />
        </HStack>

        <RolesAndServicesCard />
      </VStack>
    </Flex>
  )
}
