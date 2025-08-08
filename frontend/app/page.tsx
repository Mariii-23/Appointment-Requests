"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNutritionists, makePageKey } from "@/store/nutricionists_with_services_slice";
import Paginator from "@/components/paginator";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { AppDispatch, RootState } from "@/store";
import NutritionistWithServicesCards from "@/components/cards/nutritionit_with_service_cards";
import NutritionistServiceSearch from "@/components/nutritionist_service_search";
import BannerLayout from "./layouts/banner-layout";
import BodyLayout from "./layouts/body-layout";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const perPage = 2;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  
  const [pageKey, setPageKey] = useState(
    makePageKey({ nutritionistOrServiceName: search, location, page, per_page: perPage })
  );

  useEffect(() => {
    setPageKey(makePageKey({ nutritionistOrServiceName: search, location, page, per_page: perPage }));
  }, [search, location, page]);

  const currentPageData = useSelector(
    (state: RootState) => state.nutritionists.cache?.[pageKey] ?? null
  );

  const loading = useSelector((state: RootState) => state.nutritionists.loading);
  const error = useSelector((state: RootState) => state.nutritionists.error);

  useEffect(() => {
    dispatch(
      fetchNutritionists({
        nutritionistOrServiceName: search,
        location,
        page,
        per_page: perPage,
      })
    );
  }, [dispatch, pageKey, search, location, page, perPage]);

  const onSearch = (newSearch: string, newLocation: string) => {
    setSearch(newSearch);
    setLocation(newLocation);
    setPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
    <BannerLayout>
        <NutritionistServiceSearch onSearch={onSearch} />
    </BannerLayout>
    <BodyLayout>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {currentPageData && (
        <>
          <NutritionistWithServicesCards
            nutritionists={currentPageData.data as NutritionistWithServices[]}
          />

          {currentPageData.meta.total_pages > 1 && (
            <Paginator
              totalPages={currentPageData.meta.total_pages}
              currentPage={page}
              onClickPage={handlePageChange}
            />
          )}
        </>
      )}</BodyLayout>
    </>
  );
}