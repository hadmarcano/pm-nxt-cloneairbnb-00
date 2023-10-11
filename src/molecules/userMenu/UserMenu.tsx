"use client";

import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {signOut} from "next-auth/react";
import Avatar from "@molecules/avatar/Avatar";
import MenuItem from "@molecules/menuItem/MenuItem";
import useRegisterModal from "@/custom-hooks/useRegisterModal";
import useLoginModal from "@/custom-hooks/useLoginModal";
import { UserMenuProps } from "./interfaces/userMenuProps.interface";


// Pending to do:
// - currentUser
// - signOut
const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isOpen, setIsOpen] = useState(false);

	// USECALLBACK : Retorna una función memoizada del cálculo de esa funcion,
	// para que en este caso se procese en el componente cuando se interactúe con el estado
	// que se encuentre dentro de ese useCallback.

	const toogleOpen = useCallback(() => {
		setIsOpen(value => !value);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row justify-center items-center gap-3">
				<div
					onClick={() => {}}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
				>
					Pon tu espacio en Airbnb
				</div>
				<div
					onClick={toogleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm  ">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem onClick={()=>{}} label="Mis viajes" />
								<MenuItem onClick={()=>{}} label="Mis favoritos" />
								<MenuItem onClick={()=>{}} label="Mis reservas" />
								<MenuItem onClick={()=>{}} label="Mis propiedades" />
								<MenuItem onClick={()=>{}} label="Airbnb tu casa" />
								<hr/>
								<MenuItem onClick={()=>signOut()} label="Logout" />
							</>
						)
						:
						(
							<>
								<MenuItem onClick={registerModal.onOpen} label="registrate" />
								<MenuItem onClick={loginModal.onOpen} label="Iniciar sesión" />
							</>
						)
					}

					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
