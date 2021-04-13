import React from 'react'

// import Home from '@/pages/Home'
import ContainerHome from '@/ContainerHome'
import GamesPage from '@/pages/GamesPage'
import StatisticsPage from '@/pages/StatisticsPage'
import SettingsPage from '@/pages/SettingsPage'
import RegistrationPage from '@/pages/RegistrationPage'
import LoginPage from '@/pages/LoginPage'
import TestRequest from '@/pages/testRequest'
import VocabularyPage from '@/pages/VocabularyPage'
import AboutTeamPage from '@/pages/AboutTeamPage'
import Promo from './pages/Promo'

export default [
	{
		path: '/',
		// component: <Home />,
		component: <ContainerHome />
	},
	{
		path: '/games',
		component: <GamesPage />,
	},
	{
		path: '/statistics',
		component: <StatisticsPage />,
	},
	{
		path: '/vocabulary',
		component: <VocabularyPage />,
	},
	{
		path: '/settings',
		component: <SettingsPage />,
	},
	{
		path: '/login',
		component: <LoginPage />,
	},
	{
		path: '/registration',
		component: <RegistrationPage />,
	},
	{
		path: '/about-team',
		component: <Promo />
	},
	{
		path: '/test',
		component: <TestRequest />,
	},
	// {
	// 	path: '*',
	// 	component: <div>error</div>,
	// },
]
