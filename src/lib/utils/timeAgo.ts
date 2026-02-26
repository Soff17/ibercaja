export function formatTimeAgo(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);

	const diffMs = now.getTime() - date.getTime();

	const minutes = Math.floor(diffMs / 1000 / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	const remainingHours = hours % 24;
	const remainingMinutes = minutes % 60;

	if (minutes < 1) return "Ahora mismo";

	if (minutes < 60) {
		return `${minutes} min`;
	}

	if (hours < 24) {
		return `${hours} h ${remainingMinutes} min`;
	}

	return `${days} d ${remainingHours} h ${remainingMinutes} min`;
}
