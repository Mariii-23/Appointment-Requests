import React, { useState } from "react";
import MapPinIcon from "./icons/map-pin-icon";
import { useTranslation } from "react-i18next";

type NutritionistServiceSearchProps = {
    onSearch: (search: string, location: string) => void;
};

const NutritionistServiceSearch = ({ onSearch }: NutritionistServiceSearchProps) => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");

    const { t } = useTranslation("components/nutritionist_service_search");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(search.trim(), location.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-full">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t("search-place-holder")}
                className="input w-full"
            />

            <label className="input w-full">
                <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder={t("location-place-holder")}
                    className="pr-10"
                />
                <MapPinIcon />
            </label>

            <button
                type="submit"
                className="btn btn-secondary px-8 sm:px-16 sm:py-2 w-full sm:w-auto"
            >
                {t("button-submit")}
            </button>
        </form>
    );
};

export default NutritionistServiceSearch;
