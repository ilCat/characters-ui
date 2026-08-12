export const API_BASE = import.meta.env.VITE_API_URL || '';

export async function parseApiError(res: Response, fallbackMessage: string): Promise<string> {
    try {
        const errorData = await res.json();
        if (errorData?.detail) {
            if (typeof errorData.detail === 'string') {
                return errorData.detail;
            }
            if (Array.isArray(errorData.detail)) {
                return errorData.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
            }
            return JSON.stringify(errorData.detail);
        }
        if (errorData?.message) {
            return errorData.message;
        }
    } catch {
        // Fallback if not JSON
    }
    return `${fallbackMessage} (${res.status} ${res.statusText})`;
}