'use client';

import { useEffect, useState } from 'react';
import { FaUserTie, FaUserGraduate, FaGraduationCap } from 'react-icons/fa';
import { GiAirplaneDeparture, GiTeacher } from 'react-icons/gi';
import { MdFlightTakeoff } from 'react-icons/md'
interface StatItem {
    icon: JSX.Element;
    value: number;
    label: string;
}

const stats: StatItem[] = [
    {
        icon: <FaGraduationCap size={60} className="text-white mb-6" />,
        value: 15,
        label: "Years Experience",
    },
    {
        icon: <MdFlightTakeoff size={60} className="text-white mb-6" />,
        value: 8000,
        label: "Pilots Trained",
    },
    {
        icon: <FaGraduationCap size={60} className="text-white mb-6" />,
        value: 8,
        label: "Courses Offered",
    },
];

const StatsSection = () => {
    const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedValues((prev) =>
                prev.map((val, index) => {
                    const target = stats[index].value;
                    const increment = Math.ceil(target / 50);
                    if (val >= target) return target;
                    return Math.min(val + increment, target);
                })
            );
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-2">
            <div className="relative bg-blue py-20 rounded-3xl overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="relative px-6">
                                {index !== 0 && (
                                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 h-20 border-l border-gray-300" />
                                )}
                                <div className="flex flex-col items-center">
                                    {stat.icon}
                                    <p className="text-4xl font-bold text-white">
                                        {animatedValues[index]}{stat.label.includes("Years") || stat.label.includes("Courses") ? "+" : ""}
                                    </p>
                                    <p className="mt-2 text-xl font-medium text-white">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
