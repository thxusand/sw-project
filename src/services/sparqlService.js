const DBPEDIA_ENDPOINT = 'https://dbpedia.org/sparql'

export const fetchUniversities = async (searchQuery = '') => {
	const query = `
    SELECT DISTINCT ?university ?name ?country ?founded ?students ?nobelLaureates ?website WHERE {
      ?university a dbo:University ;
                 rdfs:label ?name .
      
      # Пошук веб-сайту університету
      OPTIONAL {
        { ?university foaf:homepage ?website }
        UNION
        { ?university dbo:website ?website }
        UNION
        { ?university dbp:website ?website }
      }
      
      # Пошук за назвою
      ${
				searchQuery
					? `
        FILTER(REGEX(LCASE(STR(?name)), LCASE("${searchQuery}"), "i"))
      `
					: ''
			}

      # Пошук країни
      {
        { ?university dbo:country ?countryObj .
          ?countryObj rdfs:label ?country }
        UNION
        { ?university dbo:location ?locationObj .
          ?locationObj dbo:country ?countryObj .
          ?countryObj rdfs:label ?country }
        UNION
        { ?university dbo:city ?cityObj .
          ?cityObj dbo:country ?countryObj .
          ?countryObj rdfs:label ?country }
        FILTER(LANG(?country) = 'en')
      }

      # Пошук дати заснування
      {
        { ?university dbo:foundingDate ?founded }
        UNION
        { ?university dbp:established ?founded }
        UNION
        { ?university dbo:establishment ?founded }
      }

      # Пошук кількості студентів
      {
        { ?university dbo:numberOfStudents ?students }
        UNION
        { ?university dbp:students ?students }
        UNION
        { ?university dbo:enrollment ?students }
      }

      # Пошук нобелівських лауреатів
      OPTIONAL {
        SELECT ?university (COUNT(DISTINCT ?laureate) as ?nobelLaureates) WHERE {
          { ?laureate dbo:almaMater ?university }
          UNION
          { ?laureate dbp:almaMater ?university }
          ?laureate dbo:award dbr:Nobel_Prize .
        } GROUP BY ?university
      }
      
      FILTER(LANG(?name) = 'en')
    }
    ORDER BY DESC(?nobelLaureates)
    LIMIT 20
  `

	const response = await fetch(
		`${DBPEDIA_ENDPOINT}?query=${encodeURIComponent(query)}&format=json`,
		{
			headers: {
				Accept: 'application/sparql-results+json',
			},
		}
	)

	if (!response.ok) throw new Error('Failed to fetch data')

	const data = await response.json()
	return data.results.bindings
}
