import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    title: string;
    rows: Record<string, string>[];
}

const isValidUrl = (string: string) => {
    if (!string) return false;
    try {
        new URL(string);
        return string.startsWith('http');
    } catch (_) {
        return false;
    }
};

export const Section: React.FC<SectionProps> = ({ id, title, rows }) => {
    if (!rows || rows.length === 0) return null;

    const validRows = rows.filter(r => Object.values(r).some(v => v));
    if (validRows.length === 0) return null;

    const columns = Object.keys(validRows[0]);

    return (
        <section id={id} className="py-16 border-b border-gray-100 last:border-0 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
            >
                <div className="flex flex-col mb-8">
                    <h2 className="text-2xl font-extrabold text-black tracking-tighter uppercase mb-3">
                        {title}
                    </h2>
                    <div className="w-16 h-1 bg-black" />
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-sm border border-gray-100 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black text-white">
                                {columns.map((col) => (
                                    <th key={col} className="p-4 text-[10px] font-black uppercase tracking-[0.2em]">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {validRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                    {columns.map((col) => {
                                        const val = row[col];
                                        return (
                                            <td key={col} className="p-4 text-gray-700 text-sm align-top leading-relaxed font-medium">
                                                {isValidUrl(val) ? (
                                                    <a href={val} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-gray-100 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                                        View Link
                                                    </a>
                                                ) : (
                                                    val
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {validRows.map((row, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-sm border border-gray-100 shadow-md flex flex-col gap-4">
                            {columns.map((col) => {
                                const val = row[col];
                                if (!val) return null;
                                return (
                                    <div key={col} className="flex flex-col gap-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            {col}
                                        </div>
                                        <div className="text-sm font-bold text-black leading-relaxed">
                                            {isValidUrl(val) ? (
                                                <a href={val} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                                                    Open Link
                                                </a>
                                            ) : (
                                                val
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
