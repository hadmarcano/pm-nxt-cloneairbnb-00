"use client";

import {useEffect} from "react";

import EmptyState from "@atoms/emptyState/EmptyState";

interface ErrorStateProps {
	error: Error
};

const ErrorState: React.FC<ErrorStateProps> = ({error}) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<EmptyState
			title="Algo salió mal"
			subtitle="Intenta volver a más tarde."
		/>
	)
}

export default ErrorState;
