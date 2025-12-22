import React from 'react';
import { Mail, Github, Linkedin, User as UserIcon } from 'lucide-react';

interface HeroProps {
    data: Record<string, string>;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
    const name = data['Full Name'] || 'Faculty Member';
    const designation = data['Designation'] || 'Designation';
    const dept = data['Department'] || '';
    const email = data['Official Email'] || '';

    const getPhotoUrl = (url: string) => {
        if (!url) return '';

        // Handle various Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let id = '';
            // Match /d/ID or /file/d/ID
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
            // Match id=ID
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);

            if (dMatch && dMatch[1]) id = dMatch[1];
            else if (idMatch && idMatch[1]) id = idMatch[1];

            if (id) {
                // This is the most reliable "hotlink" format for Google Drive photos
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }
        return url;
    };

    const photo = getPhotoUrl(data['Profile Photo Link']);

    return (
        <section id="basicInfo" className="min-h-[80vh] relative flex flex-col md:flex-row items-center overflow-hidden bg-[#e5e5e5]">
            {/* Background Diagonal Split - Desktop */}
            <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full bg-[#f4f4f4] transform skew-x-[-10deg] translate-x-32 z-0" />
            <div className="hidden md:block absolute top-0 right-0 w-[40%] h-full bg-[#f4f4f4] z-0" />

            {/* Mobile Background */}
            <div className="md:hidden absolute bottom-0 left-0 w-full h-[40%] bg-[#f4f4f4] z-0" />

            {/* Left Content Column */}
            <div className="flex-1 w-full h-full flex items-center justify-center md:justify-start px-6 md:px-16 py-20 md:py-0 z-10">
                <div className="max-w-xl flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-black mb-3">Hi, I am</h3>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-4 leading-tight tracking-tighter">
                        {name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-bold mb-8">
                        {designation} / <span className="text-gray-400">{dept}</span>
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3">
                        {[
                            { icon: <Mail size={20} />, href: `mailto:${email}` },
                            { icon: <Github size={20} />, href: '#' },
                            { icon: <Linkedin size={20} />, href: '#' }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-sm text-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:shadow-none translate-y-[-1px] active:translate-y-0"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Photo Column */}
            <div className="flex-1 w-full h-full flex items-center justify-center md:justify-end md:pr-10 z-10 mt-10 md:mt-0 pb-16 md:pb-0">
                <div className="relative w-full h-[25rem] md:w-[28rem] md:h-[40rem] overflow-hidden transition-all duration-700">
                    {photo ? (
                        <img
                            src={photo}
                            alt={name}
                            className="w-full h-full object-contain object-bottom pointer-events-none"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white bg-neutral-900 rounded-2xl">
                            <UserIcon size={96} />
                            <span className="mt-4 opacity-50">No Photo</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
