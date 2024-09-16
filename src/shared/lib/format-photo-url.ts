import { API_URL } from '@/shared/api/api.config'

export function formatPhotoUrl(photoUrl: string) {
	return API_URL + 'files/' + photoUrl
}
