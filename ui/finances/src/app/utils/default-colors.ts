export const DEFAULT_CATEGORY_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
    '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71',
    '#F1C40F', '#E74C3C', '#1ABC9C', '#9B59B6', '#34495E'
];

export function getNextAvailableColor(usedColors: string[]): string {
    return DEFAULT_CATEGORY_COLORS.find(color => 
        !usedColors.includes(color.toLowerCase())
    ) || DEFAULT_CATEGORY_COLORS[0];
}