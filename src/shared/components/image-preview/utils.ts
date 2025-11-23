export async function handleDownload(url: string) {
	if (!url) return;

	const response = await fetch(url);
	const blob = await response.blob();
	const objectUrl = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = objectUrl;
	link.download = new URL(url).pathname.split("/").pop() || "image";
	link.click();
	link.remove();
	setTimeout(() => {
		URL.revokeObjectURL(objectUrl);
	}, 100);
}
