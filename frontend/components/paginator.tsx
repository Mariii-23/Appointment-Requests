import { Fragment } from "react";
import ArrowLeftIcon from "./icons/arrow-left";
import ArrowRigthIcon from "./icons/arrow-rigth";

interface PaginatorProps {
    totalPages: number;
    currentPage: number;
    onClickPage: (page: number) => void;
    pagesToShowEachSide?: number; // default = 3
    onNextPage?: () => void;
    onPreviousPage?: () => void;
}

const Paginator = ({
    totalPages,
    currentPage,
    onClickPage,
    pagesToShowEachSide = 3,
    onNextPage,
    onPreviousPage,
}: PaginatorProps) => {
    const renderButton = (page: number) => (
        <button
            key={page}
            className={`join-item btn ${page === currentPage ? "btn-active btn-primary" : ""}`}
            onClick={() => onClickPage(page)}
        >
            {page}
        </button>
    );

    // Create a Set to hold the unique page numbers to be displayed
    const pages = new Set<number>();

    // Add the first few pages (e.g., 1, 2, 3) - always visible at the beginning
    for (let i = 1; i <= Math.min(pagesToShowEachSide, totalPages); i++) {
        pages.add(i);
    }

    // Add the last few pages (e.g., n-2, n-1, n) - always visible at the end
    for (let i = Math.max(totalPages - pagesToShowEachSide + 1, 1); i <= totalPages; i++) {
        pages.add(i);
    }

    // Add pages around the current page (e.g., currentPage - 1, currentPage, currentPage + 1)
    // This helps give context for the current position in pagination
    const currentRangeStart = Math.max(currentPage - 1, 1);
    const currentRangeEnd = Math.min(currentPage + 1, totalPages);
    for (let i = currentRangeStart; i <= currentRangeEnd; i++) {
        pages.add(i);
    }

    // Convert the Set into a sorted array so the pagination buttons appear in the correct order
    const sortedPages = Array.from(pages).sort((a, b) => a - b);

    return (
        <div className="join my-4">
            <button
                key="preview"
                className="join-item btn p-4 px-3"
                disabled={!onPreviousPage}
                onClick={onPreviousPage}
            >
                <ArrowLeftIcon color="back" size={20} />
            </button>

            {sortedPages.map((page, index) => {
                const prev = sortedPages[index - 1];
                const showEllipsis = prev && page - prev > 1;

                return (
                    <Fragment key={page}>
                        {showEllipsis && (
                            <button className="join-item btn btn-disabled">...</button>
                        )}
                        {renderButton(page)}
                    </Fragment>
                );
            })}

            <button
                key="next"
                className="join-item btn p-4 px-3"
                disabled={!onNextPage}
                onClick={onNextPage}
            >
                <ArrowRigthIcon color="black" size={20} />
            </button>
        </div>
    );
};

export default Paginator;
