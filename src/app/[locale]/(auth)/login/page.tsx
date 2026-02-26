"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	type LoginRequestSchemaForm,
	zLoginRequestSchemaForm,
} from "@/lib/validation";

export default function LoginPage() {
	const [showPass, setShowPass] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const t = useTranslations("login");
	const router = useRouter();
	const searchParams = useSearchParams();

	const callbackUrl = searchParams.get("callbackUrl") ?? "/";

	const form = useForm<LoginRequestSchemaForm>({
		resolver: zodResolver(zLoginRequestSchemaForm()),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
	});

	const onSubmit = async (values: LoginRequestSchemaForm) => {
		setFormError(null);
		setIsPending(true);

		try {
			const res = await signIn("credentials", {
				username: values.email,
				password: values.password,
				redirect: false,
				callbackUrl,
			});

			if (res?.ok) {
				router.push(res.url ?? callbackUrl);
				router.refresh();
				return;
			}

			setFormError(res?.error ?? "No se pudo iniciar sesión");
		} catch (_e) {
			setFormError("No se pudo iniciar sesión");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4">
			<div className="w-full max-w-6xl rounded-[48px] bg-[#F4F5F7] p-8 md:p-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					{/* Left image */}
					<div className="hidden md:flex justify-center">
						<div className="relative w-full max-w-xl overflow-visible">
							<div className="h-[420px] rounded-[28px] bg-[#2F80FF]" />
							<Image
								src="/images/login-header.png"
								alt="Login hero"
								width={900}
								height={520}
								priority
								className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -top-12 rounded-[48px]"
							/>
						</div>
					</div>

					{/* Right */}
					<div className="flex flex-col h-full">
						{/* Logo */}
						<div className="flex justify-center mb-8">
							<Image
								src="/images/logo-ibercaja.png"
								alt="Ibercaja"
								width={180}
								height={28}
								priority
								className="h-7 w-auto"
							/>
						</div>

						{/* Headline */}
						<h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug">
							{t("title", { app: "GEA" })}
						</h1>

						{/* Form Card */}
						<Card className="mt-8 rounded-2xl bg-transparent border-none shadow-none">
							<CardContent className="p-6">
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										{/* Email */}
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm text-gray-700">
														{t("username")}
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															autoComplete="email"
															placeholder="admin@empresa.com"
															className="h-12 rounded-xl bg-white"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* Password */}
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm text-gray-700">
														{t("password")}
													</FormLabel>

													<div className="relative">
														<FormControl>
															<Input
																type={showPass ? "text" : "password"}
																autoComplete="current-password"
																placeholder="••••••"
																className="h-12 rounded-xl bg-white pr-12"
																{...field}
															/>
														</FormControl>

														<button
															type="button"
															onClick={() => setShowPass((v) => !v)}
															className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
															aria-label={
																showPass
																	? "Ocultar contraseña"
																	: "Mostrar contraseña"
															}
														>
															{showPass ? (
																<EyeOff className="h-5 w-5" />
															) : (
																<Eye className="h-5 w-5" />
															)}
														</button>
													</div>

													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="flex justify-end">
											<NextLink
												href="/forgot"
												className="text-sm text-gray-800 hover:underline"
											>
												{t("forgot")}
											</NextLink>
										</div>

										{formError && (
											<p className="text-sm text-red-600">{formError}</p>
										)}

										<div className="pt-4 flex justify-center md:justify-end">
											<Button
												type="submit"
												disabled={isPending}
												className="h-12 rounded-full px-10"
												loading={isPending}
											>
												{isPending ? "Entrando..." : t("submit")}
												<FontAwesomeIcon
													icon={faChevronRight}
													className="ml-2 h-4 w-4"
												/>
											</Button>
										</div>
									</form>
								</Form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
