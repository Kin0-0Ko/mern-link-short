import React from 'react';



export const LinkCard = ({link}) => {
	return(<>
	
		<h2>Link</h2>
		<p>Shorten link:  <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
		<p>Link:  <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
		<p>Count clicks: <strong>{link.clicks}</strong></p>
		<p>Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
		</>)
}