"use client";
import axios from "axios";
import {useCallback, useState} from "react";
import toast from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import {useRouter} from "next/navigation"; // (next/navigation)New version recommended
import {signIn} from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "@molecules/modals/Modal";
import Heading from "@molecules/heading/Heading";
import Input from "@molecules/inputs/Input";
import Button from "@molecules/button/Button";
import useLoginModal from "@custom-hooks/useLoginModal";
import useRegisterModal from "@custom-hooks/useRegisterModal";

const LoginModal = ()=> {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onToogle = useCallback(()=>{
		loginModal.onClose();
		registerModal.onOpen();
	},[loginModal, registerModal])

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true);
		signIn("credentials",{
			...data,
			redirect: false
		}).then(callback => {
			console.log("login callback", callback);
			setIsLoading(false);
			if(callback?.ok){
				toast.success("¡Usuario autenticado!");
				router.refresh();
				loginModal.onClose();
			}

			if(callback?.error){
				toast.error(callback.error);
			}
		})
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Bienvenido de vuelta" subtitle="Inicia sesión con tu cuenta!" />
			<Input id="email" label="Correo" disabled={isLoading} register={register} errors={errors} required />
			<Input id="password" type="password" label="Contraseña" disabled={isLoading} register={register} errors={errors} required />
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3 ">
			<hr />
			<Button outline label="Continúa con Google" icon={FcGoogle} onClick={() => signIn("google")} />
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="justify-center flex flex-row items-center gap-2">
					<div>Primera vez ocupando Airbnb?</div>
					<div onClick={onToogle} className="text-neutral-500 cursor-pointer hover:underline">
						{" "}
						Crea una cuenta
					</div>
				</div>
			</div>
		</div>
	);



	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Iniciar sesión"
			actionLabel="Continúa"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);

};

export default LoginModal;
