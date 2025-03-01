


'use client';

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface Objective {
    name: string;
    cost: number;
}

export interface ObjectiveAchievement {
    objective: Objective;
    achievedAt: string; // Format: MM-YYYY
}

interface DataPoint {
    label: string; // MM-YYYY format
    value?: number;
    prediction?: number;
    specialKey?: string;
}

const RECT_WIDTH = 100;
const RECT_HEIGHT = 20;

const truncateText = (text: string, maxWidth: number, fontSize: number) => {
    const avgCharWidth = fontSize * 0.6;
    const maxChars = Math.floor(maxWidth / avgCharWidth);
    return text.length > maxChars ? text.substring(0, maxChars - 2) + "..." : text;
};

const CustomDot = (props: any) => {
    const { cx, cy, payload, onClick } = props;
    if (!payload.specialKey) return null;
    return (
        <g onClick={(e) => { e.stopPropagation(); onClick(payload); }} cursor="pointer">
            <rect x={cx - RECT_WIDTH / 2} y={cy - RECT_HEIGHT / 2} width={RECT_WIDTH} height={RECT_HEIGHT} rx={5} fill="#3db9eb" opacity={0.8} />
            <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                {truncateText(payload.specialKey, RECT_WIDTH - 10, 12)}
            </text>
        </g>
    );
};

export default function SavingsGraph({ data, objectives }: { data: DataPoint[], objectives: ObjectiveAchievement[] }) {
    const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

    const enrichedData = data.map((item) => {
        const matchingObjective = objectives.find(obj => obj.achievedAt === item.label);
        return {
            ...item,
            specialKey: matchingObjective ? matchingObjective.objective.name : undefined
        };
    });

    if(data.length < 2) {
        return (
            <div>
                
            </div>
        );
    }
    return (
        <div style={{ width: '400px', height: '300px', paddingBottom: '40px' }}>
            {
                selectedPoint && 
                <div>
                <p>Selected: {selectedPoint?.specialKey ?? selectedPoint?.label ?? "Nenhum"} ({selectedPoint?.value ?? selectedPoint?.prediction ?? 0})</p>
            </div>}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrichedData}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ pointerEvents: 'none' }} offset={30} />
                    <Line type="monotone" dataKey="value" stroke="#3db9eb" dot={(props: any) => <CustomDot {...props} onClick={setSelectedPoint} />} activeDot={false} />
                    <Line type="monotone" dataKey="prediction" stroke="#eb3d3d" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
