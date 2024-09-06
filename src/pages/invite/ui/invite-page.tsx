import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId, saveFriendId } from '@/entities/auth'
import { useAddFriend } from '@/entities/friend'
import { LoadingPage } from '@/pages/loading'

const InvitePage: FC = () => {
	const tgId = getId()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const { addFriend } = useAddFriend()

	useEffect(() => {
		if (tgId) {
			if (tgId == String(queryParams.get('id'))) {
				navigate('/menu')
			} else {
				addFriend(String(queryParams.get('id')))
			}
		} else {
			saveFriendId(queryParams.get('id'))
			navigate('/auth')
		}
	}, [])

	return <LoadingPage />
}

export default InvitePage
