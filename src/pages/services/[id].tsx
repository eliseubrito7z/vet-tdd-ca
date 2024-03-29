import { Heading, HStack, Text, VStack, Box } from '@chakra-ui/react'
import { ServiceModel } from 'domain/models/ServiceModel'
import { GetServerSideProps } from 'next'
import { ErrorOrEmptyMessage } from 'presentation/components/ErrorOrEmptyMessage'
import { UserContext } from 'presentation/context/UserContext'
import { useServiceDetails } from 'presentation/hooks/useServices'
import { useContext } from 'react'
import { EditableCard } from '../../presentation/components/Services/EditableCard'
import { Container } from 'presentation/components/Defaults/Container'
import { ServiceInformations } from 'presentation/components/Services/ServiceInformations'
import { UpdatePaymentStatusModal } from 'presentation/components/Services/UpdatePaymentStatusModal'
import { UpdateServiceStatusModal } from 'presentation/components/Services/UpdateServiceStatusModal'

interface ServiceDetailsProps {
  id: string
  initialData: ServiceModel
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const { user } = useContext(UserContext)

  const {
    data: service,
    isError,
    isFetching,
    isSuccess,
  } = useServiceDetails(id)

  const userCanEdit = user?.id === service?.medic.id

  return (
    <Container
      flexDir="column"
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {!isSuccess ? (
        <ErrorOrEmptyMessage isError={isError} isLoading={isFetching} />
      ) : (
        <>
          <HStack w="100%" align="center" justify="space-between" pb={4}>
            <Heading fontWeight={600} fontSize="1.5rem" color="green.900">
              Atendimento N° {id}
            </Heading>
            <HStack>
              {userCanEdit && <UpdateServiceStatusModal service={service} />}
              <UpdatePaymentStatusModal service={service} />
            </HStack>
          </HStack>

          <ServiceInformations service={service} />

          <VStack w="100%">
            <Text
              textAlign="center"
              w="100%"
              fontSize="1.25rem"
              fontWeight={600}
              bg="blue.300"
            >
              Detalhes
            </Text>
            <VStack w="100%" align="start" borderBottom="1px">
              <Text fontSize="1.125rem" fontWeight={600}>
                Razão
              </Text>
              <Text>{service.reason}</Text>
            </VStack>

            <Box
              p="1rem"
              bg="white"
              borderRadius={12}
              w="100%"
              h="100%"
              minH="20rem"
            >
              <EditableCard
                whoCanEdit={service.medic.id}
                id={id}
                title="Resultado do Exame"
                value={service.description}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = String(ctx.params!.id)
  // const api = setupAPIClient(ctx)
  // const response = await api.get(`/api/services/v1/${id}`)

  // const initialData: Service = {
  //   ...response.data,
  // }

  return {
    props: {
      id,
      // initialData,
    },
  }
}
