import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Layout, Soon } from '@/components/ui'

const Statistics: FC = () => {
	const navigate = useNavigate()

	return (
		<Layout
			header={{ icon: 'statistics', title: 'Статистика' }}
			footer={
				<Button onClick={() => navigate('/menu')} icon='back'>
					Назад
				</Button>
			}
		>
			<Soon />
		</Layout>
	)
}

export default Statistics
