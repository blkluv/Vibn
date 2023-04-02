import { useState } from 'react'

export default function Image({ src }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<img src={src} />
	)
}