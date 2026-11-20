"use client";

import { MapPin, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import FooterLinks from "./FooterLinks";

export default function Footer() {
    return (
        <footer className="bg-[#24120C] text-white">
            <div className="
                mx-auto
                grid
                max-w-7xl
                gap-10
                sm:gap-12
                px-5
                py-12
                sm:px-6
                sm:py-16
                lg:gap-16
                lg:py-20
                lg:grid-cols-4
            ">
                {/* Logo */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-[0.2em]">
                        JENYFER.
                    </h2>

                    <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-7 sm:leading-8 text-[#D7C9C2]">
                        Especialista em design de sobrancelhas,
                        valorizando sua beleza natural com um
                        atendimento personalizado.
                    </p>
                </div>

                {/* Navegação */}
                <div>
                    <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold">
                        Navegação
                    </h3>

                    <FooterLinks />
                </div>

                {/* Contato */}
                <div>
                    <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold">
                        Contato
                    </h3>

                    <div className="space-y-4 sm:space-y-5">
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="shrink-0 text-[#D89B8A]" />
                            <span className="text-sm sm:text-base text-[#D7C9C2]">
                                (43) 9819-9706
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="shrink-0 text-[#D89B8A]" />
                            <span className="text-sm sm:text-base text-[#D7C9C2]">
                                Apucarana - PR - UF
                            </span>
                        </div>
                    </div>
                </div>

                {/* Redes */}
                <div>
                    <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold">
                        Redes Sociais
                    </h3>

                    <a
                        href="https://www.instagram.com/lash_jhenyffer?cplk=MWJ5NHQwejk3YzI4dw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="
                            inline-flex
                            h-10
                            w-10
                            sm:h-12
                            sm:w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-[#3A1C12]
                            transition-all
                            hover:bg-[#573024]
                        "
                    >
                        <FaInstagram className="text-[#D89B8A]" size={18} />
                    </a>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    justify-between
                    gap-3
                    px-5
                    py-5
                    sm:gap-4
                    sm:px-6
                    sm:py-6
                    text-center
                    text-xs
                    sm:text-sm
                    text-[#BDAEA7]
                    md:flex-row
                ">
                    <p>
                        © 2026 Jenyfer. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}