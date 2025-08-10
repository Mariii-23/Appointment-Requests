import React from "react";
import ArrowLeftIcon from "@/components/icons/arrow-left";
import ArrowRigthIcon from "@/components/icons/arrow-rigth";
import ShareNodesIcon from "@/components/icons/Arrows-rotate";
import ArrowRotateIcon from "@/components/icons/share-nodes-icon";

type AppointmentsHeaderProps = {
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
}: AppointmentsHeaderProps) => {
    return (
        <div className="flex flex-row justify-between mb-4">
            <div>
                <h1 className="text-xl font-bold">Pending Requests</h1>
                <h6 className="text-sm text-gray-600">Accept or reject new pending request</h6>
            </div>

            <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-2 items-center">
                    <button
                        className="btn btn-outline"
                        disabled={disablePreviosPage}
                        onClick={onPreviousPage}
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        className="btn btn-outline"
                        disabled={disableNextPage}
                        onClick={onNextPage}
                    >
                        <ArrowRigthIcon />
                    </button>
                </div>
                <button className="btn btn-outline" onClick={() => alert("TODO: Share nodes")}>
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
