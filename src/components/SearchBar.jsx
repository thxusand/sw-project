import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import debounce from 'lodash/debounce'
import { Search } from 'lucide-react'
import React, { useCallback, useState } from 'react'

const SearchBar = ({ onSearch, loading }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearch = useCallback(
		debounce(query => {
			onSearch(query)
		}, 300),
		[onSearch]
	)

	const handleChange = e => {
		const query = e.target.value
		setSearchQuery(query)
		debouncedSearch(query)
	}

	return (
		<div className='flex gap-2 mb-6'>
			<Input
				type='text'
				placeholder='Пошук університету...'
				value={searchQuery}
				onChange={handleChange}
				className='flex-1'
			/>
			<Button disabled={loading}>
				<Search className='w-4 h-4 mr-2' />
				{loading ? 'Пошук...' : 'Знайти'}
			</Button>
		</div>
	)
}

export default SearchBar
