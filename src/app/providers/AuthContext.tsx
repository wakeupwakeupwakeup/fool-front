import React, { createContext, useEffect, useState } from 'react'
import { getId, saveId } from '@/entities/auth'

interface AuthContextType {
	id: string | undefined | null
	setId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const AuthContext = createContext<AuthContextType>({
	id: null,
	setId: () => {},
})

export function AuthProvider({ children }) {
	const [id, setId] = useState<string | undefined | null>(getId())

	useEffect(() => {
		if (id) saveId(id)
	}, [id])

	return (
		<AuthContext.Provider value={{ id, setId }}>
			{children}
		</AuthContext.Provider>
	)
}
