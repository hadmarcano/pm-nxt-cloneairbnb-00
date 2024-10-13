import {create} from "zustand";

import {ISearchModalStore} from "./interfaces/searchModal.interface";

const useSearchModal = create<ISearchModalStore>((set) => ({
	isOpen: false,
	open: () => set({isOpen: true}),
	close: () => set({isOpen: false}),
}));

export default useSearchModal;
