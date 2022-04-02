import { useCallback } from 'react'



export const useMassege = () => {
	return useCallback( text => {
		if(text && window.M){
			window.M.toast({html: text})
		}
	}, [])
}