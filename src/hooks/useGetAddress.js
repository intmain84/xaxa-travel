import { useState, useEffect } from 'react'

const useGetAddress = (latitude, longitude) => {
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAddress = async () => {
            if (!latitude || !longitude) return

            try {
                setLoading(true)
                setError(null)

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch address data')
                }

                const data = await response.json()

                // Create an array of address parts, excluding undefined values
                const addressParts = [
                    data.address?.road,
                    data.address?.house_number,
                    data.address?.city,
                    data.address?.state,
                    data.address?.country,
                ].filter(Boolean) // Remove all undefined, null, and empty strings

                // Join address parts with commas
                const formattedAddress = addressParts.join(', ')

                setAddress(formattedAddress)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAddress()
    }, [latitude, longitude])

    return { address, loading, error }
}

export default useGetAddress
