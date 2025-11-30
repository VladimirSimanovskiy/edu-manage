import { FileValue } from "@/components/input";

export function downloadFile(value: FileValue) {
	if (!value) return;

	if (value instanceof File) {
		// Логика для браузерного File объекта
		const url = URL.createObjectURL(value);
		const link = document.createElement("a");
		link.href = url;
		link.download = value.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		// Освобождаем память
		URL.revokeObjectURL(url);
	} else if (value.url) {
		// Логика для FileInfo с URL
		const link = document.createElement("a");
		link.href = value.url;
		link.download = value.name;
		link.target = "_blank";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
