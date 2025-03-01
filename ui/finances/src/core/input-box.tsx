import { Stack } from "@mui/material";






export default function InputBox({ child, label, icon }: { child: React.ReactNode, label?: string,
    icon?:
        React.ReactNode
 }) {
    return (
        <div className="p-4 bg-white shadow-sm rounded-md">
            <Stack>
                {label && <label className="text-sm font-semibold">{label}</label>}
                <Stack direction="row"  alignItems="center">
                    {icon}
                    {child}
                    </Stack>
            </Stack>
        </div>
    );

}