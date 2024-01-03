const formatDate = (dateTime: Date) => {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(dateTime));

	const withoutAt = formattedDate.replace(" at", "");
	return withoutAt;
};

export default formatDate;
