import React, {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react'

import { getId, saveId } from '@/services/auth/auth.helper'

interface AuthContextType {
	id: string | undefined
	setId: React.Dispatch<React.SetStateAction<string | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [id, setId] = useState<string | undefined>(getId())

	useEffect(() => {
		if (id) saveId(id)
	}, [id])

	return (
		<AuthContext.Provider value={{ id, setId }}>
			{children}
		</AuthContext.Provider>
	)
}
export const useAuth = () => useContext(AuthContext)
