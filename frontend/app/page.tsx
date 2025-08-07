"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNutritionists, makePageKey } from "@/store/nutricionists_with_services_slice";
import Paginator from "@/components/paginator";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { AppDispatch, RootState } from "@/store";
import NutritionistWithServicesCards from "@/components/cards/nutritionit_with_service_cards";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(2);
  const [page, setPage] = useState(1);

  // Aqui acessa direto a página no cache
  const pageKey = makePageKey({ search, page, per_page: perPage });

  const currentPageData = useSelector(
    (state: RootState) => state.nutritionists.cache?.[pageKey] ?? null
  );

  const nutritionistsState = useSelector((state: RootState) => state.nutritionists);
  console.log("Nutritionists State", nutritionistsState);


  const loading = useSelector((state: RootState) => state.nutritionists.loading);
  const error = useSelector((state: RootState) => state.nutritionists.error);

  // Só faz fetch quando algo muda (search, page, perPage)
  useEffect(() => {
    dispatch(fetchNutritionists({ search, page, per_page: perPage }));
  }, [search, page, perPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search nutritionists or services"
        className="input input-bordered w-full max-w-xs mb-4"
      />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {currentPageData && (
        <>
          <NutritionistWithServicesCards nutritionists={currentPageData.data as NutritionistWithServices[]} />

          {currentPageData.meta.total_pages > 1 && (
            <Paginator
              totalPages={currentPageData.meta.total_pages}
              currentPage={page}
              onClickPage={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
