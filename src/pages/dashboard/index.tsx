import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Sidebar } from 'presentation/components/Sidebar/Sidebar'
import { DataCards } from './components/DataCards'
import { FinanceCard } from './components/FinanceCard'
import { LastPatients } from './components/LastPatients'
import { SearchBar } from './components/SearchBar'
import { Reports } from './components/Reports'
import { AxiosHttpClient } from 'infra/http/axios-http-client/axios-http-client'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { NewPatientModal } from 'presentation/components/Modals/NewPatientModal'
import { NewServiceModal } from 'presentation/components/Modals/NewServiceModal'
import { useContext, useEffect } from 'react'
import { UserContext } from 'presentation/context/UserContext'
import { OnDutyButton } from 'presentation/components/Modals/OnDutyButton'
import { useReports } from 'presentation/hooks/useReports'
import { useServices } from 'presentation/hooks/useServices'

export default function Dashboard() {
  const axios = new AxiosHttpClient(undefined)
  const { user } = useContext(UserContext)
  const { data: lastServices } = useServices()

  return (
    <Box p="1rem 1rem 1rem 1.5rem" w="100%" h="100%">
      <Flex mb={5} w="100%" justify="space-between" align="center">
        <VStack align="start">
          <Text
            lineHeight={1}
            color="green.900"
            fontWeight={600}
            fontSize="2xl"
          >
            Bem vindo(a) novamente, {user?.fullName.split(' ')[0]}
          </Text>
          <Text
            lineHeight={1}
            color="gray.200"
            fontSize="xs"
            fontWeight={500}
            sx={{ span: { color: 'green.600' } }}
          >
            Sua clinica está trabalhando no modo: <span>Normal</span>
          </Text>
        </VStack>

        <HStack>
          <OnDutyButton />
          <NewServiceModal />
          <NewPatientModal />
        </HStack>
      </Flex>

      <DataCards />

      <Grid templateColumns="65% 30%" mt={4} columnGap="5%">
        <GridItem w="100%">
          <VStack w="100%" overflow="auto">
            <SearchBar />
            <LastPatients services={lastServices} />
          </VStack>
        </GridItem>
        <GridItem>
          <VStack>
            <FinanceCard />
            <Reports />
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const axios = new AxiosHttpClient()
//   const { 'vet.token': token } = parseCookies(ctx)
//   const { body: lastServices } = await axios.request({
//     method: 'get',
//     url: 'api/services/v2',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   const { body: reports } = await axios.request({
//     method: 'get',
//     url: 'api/reports/v2',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })

//   return {
//     props: { lastServices, reports },
//   }
// }
