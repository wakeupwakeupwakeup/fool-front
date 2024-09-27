import { API_URL } from '@/shared/consts/url'

export function formatPhotoUrl(photoUrl: string) {
	return API_URL + 'files/' + photoUrl
}
