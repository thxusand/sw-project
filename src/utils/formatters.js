export const formatUniversityData = rawData => {
	return rawData.map(item => ({
		name: item.name.value,
		country: item.country.value,
		founded: item.founded?.value
			? new Date(item.founded.value).getFullYear()
			: 'Unknown',
		students: item.students?.value
			? parseInt(item.students.value).toLocaleString()
			: 'Unknown',
		nobelLaureates: item.nobelLaureates?.value || '0',
	}))
}
