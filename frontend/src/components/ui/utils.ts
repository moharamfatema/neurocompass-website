export function snakeToHuman(str: string): string {
    return str.replace(/_/g, " ");
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function snakeToTitle(str: string): string {
    return capitalizeFirstLetter(snakeToHuman(str));
}