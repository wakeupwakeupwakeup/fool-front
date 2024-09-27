import { useQuery } from '@tanstack/react-query'
import { ReferralService } from '@/entities/referral/api/referral.service'

export const useReferrals = () => {
	const { data: friends, isLoading: isFriendsLoading } = useQuery({
		queryKey: ['getReferrals'],
		queryFn: () => ReferralService.getReferrals(),
	})

	return { friends, isFriendsLoading }
}
