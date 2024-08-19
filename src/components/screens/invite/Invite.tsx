import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loading } from '@/components/screens'

import { getId, saveFriendId } from '@/services/auth/auth.helper'

import { useFriends } from '@/hooks'

const Invite: FC = () => {
	const tg_id = getId()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const { addFriend } = useFriends()

	useEffect(() => {
		if (tg_id) {
			addFriend(Number(queryParams.get('id')))
		} else {
			saveFriendId(queryParams.get('id'))
			navigate('/auth')
		}
	}, [])

	return <Loading />
}

export default Invite
