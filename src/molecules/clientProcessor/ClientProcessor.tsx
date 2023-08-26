"use client";
// this component will helped us to optimize and traffic regulation between server components and client components.

import React, { useState, useEffect } from "react";
import ClientProcessorProps from "@molecules/clientProcessor/interface/clientProcessor.interface";

const ClientProcessor: React.FC<ClientProcessorProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <div>{children}</div>;
};

export default ClientProcessor;
