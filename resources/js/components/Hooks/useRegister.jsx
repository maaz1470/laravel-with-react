import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function useRegister(data){
	const [response, setResponse] = useState('');
	const [loading, setLoading]	= useState(false);
	axios.post('/api/register',data).then(response => {
		if(response.status === 200){
			setLoading(true)
			setResponse(response.data)
		}
	})
	return response;
}