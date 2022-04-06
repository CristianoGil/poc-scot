export function blobToBase64(blob: Blob): Promise<ArrayBuffer | string | null> {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}