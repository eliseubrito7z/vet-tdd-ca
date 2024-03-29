import { useStaff } from 'presentation/hooks/useStaff'
import { createContext, ReactNode, useState } from 'react'
import { StaffReducedModel } from 'domain/models/StaffModel'
import { usePatients } from 'presentation/hooks/usePatients'
import { PatientReducedModel } from 'domain/models/PatientModel'
import { useServices } from 'presentation/hooks/useServices'
import { ServiceModel } from 'domain/models/ServiceModel'

type SearchContextData = {
  searchForAStaffForService(name: string): void
  staffsFounded: StaffReducedModel[]
  searchForPatient(name: string): void
  patientsFounded: PatientReducedModel[]
  searchForBreed(name: string): void
  breedsFounded: string[]
  searchInAllStaff(name: string): void
  searchForServicePerPatient(name: string): void
  servicesFounded: ServiceModel[]
}

export const SearchContext = createContext({} as SearchContextData)

interface SearchContextProps {
  children: ReactNode
}

export function SearchContextProvider({ children }: SearchContextProps) {
  const { data: allStaff } = useStaff()
  const { data: allPatients } = usePatients()
  const { data: allServices } = useServices()
  const [staffsFounded, setStaffsFounded] =
    useState<StaffReducedModel[]>(allStaff)
  const [breedsFounded, setBreedsFounded] = useState<string[]>([])
  const [servicesFounded, setServicesFounded] =
    useState<ServiceModel[]>(allServices)
  const [patientsFounded, setPatientsFounded] =
    useState<PatientReducedModel[]>(allPatients)

  const notAllowedRolesToDoAService = ['ASSISTANT', 'INTERN']

  const staffWhoCanDoServices = allStaff?.filter(
    (staff) => !notAllowedRolesToDoAService.includes(staff.role.description),
  )

  function searchForAStaffForService(name: string) {
    const founded = staffWhoCanDoServices.filter((staff) =>
      staff.fullName.toLowerCase().includes(name.toLowerCase()),
    )

    setStaffsFounded(founded)

    if (founded === undefined) {
      setStaffsFounded([])
    }
  }

  function searchInAllStaff(name: string) {
    const founded = allStaff?.filter((staff) =>
      staff.fullName.toLowerCase().includes(name.toLowerCase()),
    )

    setStaffsFounded(founded)

    if (founded === undefined) {
      setStaffsFounded([])
    }
  }

  function searchForPatient(name: string) {
    const founded = allPatients?.filter((patient) =>
      patient.name.toLowerCase().includes(name.toLowerCase()),
    )

    setPatientsFounded(founded)

    if (founded === undefined) {
      setStaffsFounded([])
    }
  }

  const breeds: Array<string> = []

  allPatients?.forEach((patient) => {
    if (!breeds.includes(patient.breed.toUpperCase())) {
      breeds.push(patient.breed.toUpperCase())
    }
  })

  function searchForBreed(name: string) {
    const founded = breeds?.filter((breed) =>
      breed.toLowerCase().includes(name.toLowerCase()),
    )

    setBreedsFounded(founded)

    if (founded === undefined) {
      setStaffsFounded([])
    }
  }

  function searchForServicePerPatient(name: string) {
    const founded = allServices?.filter((service) =>
      service.patient.name.toLowerCase().includes(name.toLowerCase()),
    )

    setServicesFounded(founded)

    if (founded === undefined) {
      setServicesFounded([])
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchForAStaffForService,
        staffsFounded,
        patientsFounded,
        searchForPatient,
        breedsFounded,
        searchForBreed,
        searchInAllStaff,
        servicesFounded,
        searchForServicePerPatient,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
