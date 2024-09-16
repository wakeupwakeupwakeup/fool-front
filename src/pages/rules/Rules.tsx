import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/app'
import { Button } from '@/shared/ui/button'
import Soon from '@/shared/ui/soon/Soon'

const Rules: FC = () => {
	const navigate = useNavigate()

	return (
		<Layout
			header={{ icon: 'rules', title: 'Правила' }}
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

export default Rules
