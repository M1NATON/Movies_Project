import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../../baseUrl"
import { RootState } from "../store"


const baseQuery = fetchBaseQuery({
  method: 'GET',
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).user.token || localStorage.getItem('token');

    if(token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
})




export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})