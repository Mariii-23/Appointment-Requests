import React, { ReactNode } from "react";

type CardWithButtonLayoutProps = {
    children: ReactNode;
    buttonText: string;
    onButtonClick: () => void;
    buttonClassName?: string;
};

const CardWithButtonLayout: React.FC<CardWithButtonLayoutProps> = ({
    children,
    buttonText,
    onButtonClick,
    buttonClassName = "btn btn-outline w-full rounded-none border-t border-black border-l-0 border-r-0 border-b-0 text-primary-green",
}) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm w-full border border-black rounded-none">
            <div className="card-body flex flex-col gap-4 w-full">{children}</div>
            <button className={buttonClassName} onClick={onButtonClick} type="button">
                {buttonText}
            </button>
        </div>
    );
};

export default CardWithButtonLayout;
