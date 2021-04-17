import { getStatistics, setStatistics } from '@/utils/apiRequests/statistics'
import returnDate from '@/utils/returnDate'

const updateTodayStatistic = (
	statistic,
	date,
	games,
	newDataObj,
	isNewDate,
) => {
	return {
		date,
		answerTrue: 0,
		countWord: 0,
		games: {
			...games,
			audio: {
				countAnswer: isNewDate
					? statistic.answer
					: statistic.answer + newDataObj.games.audio.countAnswer,
				trueAnswer: isNewDate
					? statistic.currentAnswer
					: statistic.currentAnswer + newDataObj.games.audio.trueAnswer,
				seriesAnswer: isNewDate
					? statistic.bestSeries
					: statistic.bestSeries > newDataObj.games.audio.seriesAnswer
					? statistic.bestSeries
					: newDataObj.games.audio.seriesAnswer,
			},
		},
	}
}
// currentAnswer: 0,
// errorAnswer: 0,
// series: 0,
// bestSeries: 0,
// exp: 0,
// answer: 0,
const updateStatistic = async (userId, userToken, statistic) => {
	const today = returnDate() // этот день
	const statData = await getStatistics(userId, userToken) // дата с АРІ
	const dateItems = statData.optional.dates.dateItems // массив статистик за все время
	const games = statData.optional.dates.dateItems.games
	const oldDataArr = dateItems.filter(elem => elem.date !== today) // массив за прошлые дни
	const newDataObj = dateItems.find(elem => elem.date === today) // стат за сегодняшний день
	const isNewDate = dateItems.includes(elem => elem.date === today) // gпроверка на наличие даты

	console.log('oldDataArr', oldDataArr)
	console.log('newDataObj', newDataObj)
	console.log('isNewDate', isNewDate)
	const tudayStatistic = updateTodayStatistic(
		statistic,
		today,
		games,
		newDataObj,
		isNewDate,
	)
	const newCountLernedWords = statData.learnedWords + statistic.currentAnswer
	//	statData.optional.dates.dateItems = ['hyi']
	console.log('statData', statData)
	console.log('tudayStatistic', tudayStatistic)

	// const newData = {
	// 	...statData,
	// 	optional: {
	// 		...statData.optional,
	// 		dates: {
	// 			...statData.optional.dates,
	// 			dateItems: [...dateItems, {}],
	// 		},
	// 	},
	// }

	// setStatistics(userId, userToken, newCountLernedWords)
}

export default updateStatistic
