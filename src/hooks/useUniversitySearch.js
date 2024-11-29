import { useCallback, useState } from 'react'
import { fetchUniversities } from '../services/sparqlService'

const cache = new Map()
const CACHE_TIME = 5 * 60 * 1000

export const useUniversitySearch = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const searchUniversities = useCallback(async query => {
		setLoading(true)
		setError(null)

		const cacheKey = query || '*all*'

		try {
			if (cache.has(cacheKey)) {
				const { data, timestamp } = cache.get(cacheKey)
				if (Date.now() - timestamp < CACHE_TIME) {
					return data
				}
				cache.delete(cacheKey)
			}

			const rawData = await fetchUniversities(query)
			const formattedData = rawData.map(item => ({
				name: item.name.value,
				country: item.country?.value || 'Невідомо',
				founded: item.founded?.value
					? new Date(item.founded.value).getFullYear()
					: 'Невідомо',
				students: item.students?.value
					? parseInt(item.students.value).toLocaleString()
					: 'Невідомо',
				nobelLaureates: item.nobelLaureates?.value || '0',
				website: item.website?.value || null,
				uri: item.university.value,
			}))

			cache.set(cacheKey, {
				data: formattedData,
				timestamp: Date.now(),
			})

			return formattedData
		} catch (err) {
			setError(err.message)
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	return { searchUniversities, loading, error }
}
