import i18n from "i18next";

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const locale = i18n.language || "en-US";

    const getOrdinal = (n: number) => {
        if (locale.startsWith("pt")) {
            return "";
        } else {
            if (n > 3 && n < 21) return "th";
            switch (n % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }
    };

    const day = date.getDate();
    const dayWithOrdinal = locale.startsWith("pt")
        ? `${day}${getOrdinal(day)}`
        : `${day}${getOrdinal(day)}`;

    const monthYear = date.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
    });

    const time = date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: !locale.startsWith("pt"),
    });

    return {
        day: dayWithOrdinal,
        monthYear,
        time,
    };
};
