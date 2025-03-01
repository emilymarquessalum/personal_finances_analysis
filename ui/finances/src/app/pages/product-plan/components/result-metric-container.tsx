import { Card, CardContent, Typography, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function ResultMetricContainer({
    label,
    value,
    maxValue,
    minValue,
    tip,borderColor
}: {
    label: string;
    value: number;
    maxValue?: number;
    minValue?: number;
    borderColor?: string;
    tip?: React.ReactNode;
}) {
    return (
        <Card
            style={{
                margin: "16px 0",
                width: 300,
                height: 150,
                alignItems: "center",
                position: "relative",
                borderRadius: "12px",
                border: borderColor? `6px solid #${borderColor}` : "2px solid #000",
            }}
        >
            <CardContent  >
                <div className="flex items-center gap-2">
                    <Typography variant="h6" component="h2">
                        {label}
                    </Typography>
                 
                </div>
                <Typography variant="h4" component="p" style={{
                    paddingTop: "10px",
                }}>
                    {value}
                </Typography>
                {maxValue && value !== maxValue && (
                    <Typography variant="body2" component="p">
                        {value > maxValue ? "Negative by " : "Positive by "} {Math.abs(value - maxValue)}
                    </Typography>
                )}
                {minValue && minValue !== value && (
                    <Typography variant="body2" component="p">
                        {value < minValue ? "Negative by " : "Positive by "} {Math.abs(value - minValue)}
                    </Typography>
                )}
                   {tip && (
                        <Tooltip
                        style={{ padding: "20px" }}
                        title={tip} arrow>
                            <InfoIcon style={{ cursor: "pointer" }} />
                        </Tooltip>
                    )}
            </CardContent>
        </Card>
    );
}
