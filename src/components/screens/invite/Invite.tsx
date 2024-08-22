import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loading } from '@/components/screens'

import { getId, saveFriendId } from '@/services/auth/auth.helper'

import { useAddFriend } from '@/hooks'

const Invite: FC = () => {
	const tg_id = getId()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const { addFriend } = useAddFriend()

	useEffect(() => {
		if (tg_id) {
			if (tg_id == String(queryParams.get('id'))) {
				navigate('/menu')
			} else {
				addFriend(String(queryParams.get('id')))
			}
		} else {
			saveFriendId(queryParams.get('id')).then(() => {
				navigate('/auth')
			})
		}
	}, [])

	return <Loading />
}

export default Invite
