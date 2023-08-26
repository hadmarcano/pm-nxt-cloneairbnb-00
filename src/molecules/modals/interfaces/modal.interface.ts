export default interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title: string;
	body: React.ReactElement;
	footer: React.ReactElement;
	actionLabel: string;
	disabled: boolean;
}

// IMPORTANT: React.ReactElement:(Interface element) !== React.Node:(Component)