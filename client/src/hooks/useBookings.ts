import { useQuery } from '@tanstack/react-query'
import { bookingApi } from '../api/bookingApi'

export function useBookings(params?: any) {
    return useQuery(['bookings', params], () => bookingApi.listForUser(params))
}

export default useBookings
