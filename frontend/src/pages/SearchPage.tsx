import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { searchForm } from "../components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import CuisinesFilter from "@/components/CuisinesFilter";
import SortOptionDropDown from "@/components/SortOptionDropDown";
export type searchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sort: string;
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<searchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sort: "",
  });
  const { results, isPending } = useSearchRestaurants(searchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      page: 1,
      selectedCuisines,
    }));
  };
  const setSort = (value: string) => {
    if (value === searchState.sort) {
      setSearchState((prev) => ({
        ...prev,
        sort: "",
        page: 1,
      }));
    } else {
      setSearchState((prev) => ({
        ...prev,
        sort: value,
        page: 1,
      }));
    }
  };
  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page: page,
    }));
  };
  console.log(searchState);
  if (isPending) {
    return <span>Loading....</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }
  const setSearchQuery = (searchFormData: searchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisinesFilter
          isExpanded={isExpanded}
          onExpandedClicked={() => setIsExpanded((prev) => !prev)}
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or resutaurant name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo city={city} total={results?.pagination.total} />
          <SortOptionDropDown
            sortOption={searchState.sort}
            onChange={setSort}
          />
        </div>
        {results.data.map((restaurant, index) => (
          <SearchResultsCard key={index} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default SearchPage;
