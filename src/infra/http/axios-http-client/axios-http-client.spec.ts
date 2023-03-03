import { faker } from '@faker-js/faker';
import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>


describe("AxiosHttpAxios", () => {
  test('Should call axios with correct url', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})

export { };

