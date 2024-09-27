import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import Soon from '@/shared/ui/soon/Soon'
import Layout from '@/shared/ui/layout/Layout'

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
