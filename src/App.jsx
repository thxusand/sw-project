import { GraduationCap } from 'lucide-react'
import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import UniversityCard from './components/UniversityCard'
import { useUniversitySearch } from './hooks/useUniversitySearch'

const App = () => {
	const [universities, setUniversities] = useState([])
	const { searchUniversities, loading, error } = useUniversitySearch()

	const handleSearch = async query => {
		try {
			const results = await searchUniversities(query)
			setUniversities(results)
		} catch (err) {
			// Помилка вже оброблена в хуку
			console.error('Search error:', err)
		}
	}

	return (
		<div className='p-6 max-w-6xl mx-auto'>
			<h1 className='text-3xl font-bold mb-6 flex items-center gap-2'>
				<GraduationCap className='w-8 h-8' />
				Світові університети
			</h1>

			<SearchBar onSearch={handleSearch} loading={loading} />

			{error && <div className='text-red-500 mb-4'>Помилка: {error}</div>}

			<div className='grid gap-4 md:grid-cols-2'>
				{universities.map((uni, index) => (
					<UniversityCard key={index} university={uni} />
				))}
			</div>
		</div>
	)
}

export default App
