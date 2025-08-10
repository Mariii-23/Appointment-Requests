import React from "react";
import ArrowLeftIcon from "@/components/icons/arrow-left";
import ArrowRigthIcon from "@/components/icons/arrow-rigth";
import ShareNodesIcon from "@/components/icons/Arrows-rotate";
import ArrowRotateIcon from "@/components/icons/share-nodes-icon";
import { useTranslation } from "react-i18next";

type PendingAppointmentsHeaderProps = {
    onPreviousPage: () => void;
    onNextPage: () => void;
    onRefresh: () => void;
    disablePreviosPage: boolean;
    disableNextPage: boolean;
};

export const AppointmentsHeader = ({
    onPreviousPage,
    onNextPage,
    onRefresh,
    disableNextPage,
    disablePreviosPage,
}: PendingAppointmentsHeaderProps) => {
    const { t } = useTranslation("components/header/pending_appointment");

    return (
        <div className="flex flex-row justify-between mb-4">
            <div>
                <h1 className="text-xl font-bold">{t("title")}</h1>
                <h6 className="text-sm text-gray-600">{t("subtitle")}</h6>
            </div>

            <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-2 items-center">
                    <button
                        className="btn btn-outline"
                        disabled={disablePreviosPage}
                        onClick={onPreviousPage}
                    >
                        <ArrowLeftIcon color="black" />
                    </button>
                    <button
                        className="btn btn-outline"
                        disabled={disableNextPage}
                        onClick={onNextPage}
                    >
                        <ArrowRigthIcon color="black" />
                    </button>
                </div>
                <button className="btn btn-outline">
                    <ShareNodesIcon />
                </button>
                <button className="btn btn-outline" onClick={onRefresh}>
                    <ArrowRotateIcon />
                </button>
            </div>
        </div>
    );
};

export default AppointmentsHeader;
