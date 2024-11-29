// src/components/UniversityCard.jsx
import { Card, CardContent } from '@/components/ui/card'
import { Globe, GraduationCap, MapPin, Trophy, Users } from 'lucide-react'
import React from 'react'

const UniversityCard = ({ university }) => {
	const { name, country, founded, students, nobelLaureates, website, uri } =
		university

	// Функція для отримання коректного URL
	const getLink = () => {
		if (website) return website
		// Якщо немає веб-сайту, використовуємо URI з DBpedia
		return uri?.replace(
			'http://dbpedia.org/resource/',
			'http://dbpedia.org/page/'
		)
	}

	return (
		<a
			href={getLink()}
			target='_blank'
			rel='noopener noreferrer'
			className='block transition-transform hover:scale-105'
		>
			<Card className='hover:shadow-lg transition-shadow'>
				<CardContent className='p-4'>
					<div className='flex items-start justify-between'>
						<h2 className='text-xl font-semibold mb-3'>{name}</h2>
						<Globe className='w-5 h-5 text-gray-400 flex-shrink-0 mt-1' />
					</div>
					<div className='space-y-2 text-sm'>
						<div className='flex items-center gap-2'>
							<MapPin className='w-4 h-4 text-gray-500' />
							<span>Країна: {country}</span>
						</div>
						<div className='flex items-center gap-2'>
							<GraduationCap className='w-4 h-4 text-gray-500' />
							<span>Засновано: {founded}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Users className='w-4 h-4 text-gray-500' />
							<span>Студентів: {students}</span>
						</div>
						<div className='flex items-center gap-2'>
							<Trophy className='w-4 h-4 text-gray-500' />
							<span>Нобелівських лауреатів: {nobelLaureates}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</a>
	)
}

export default UniversityCard
