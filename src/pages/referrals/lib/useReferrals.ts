import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ReferralService } from '@/entities/referral/api/referral.service'

export const useReferrals = () => {
	const { data: friends, isLoading: isFriendsLoading } = useQuery(
		['getReferrals'],
		() => {
			return ReferralService.getReferrals()
		},
	)

	return useMemo(
		() => ({
			friends,
			isFriendsLoading,
		}),
		[friends, isFriendsLoading],
	)
}
