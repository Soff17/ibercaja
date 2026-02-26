import type { Dayjs } from "dayjs";
import type { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import type { StateCreator } from "zustand";

export interface RequestsFilters {
	searchValue: string;
	page: number;
	pageSize: string;
	requestType: number;
	sortBy: string;
	sortDirection: boolean;
	setRequestType: (type: number) => void;
	setPage: (page: number) => void;
	setNextPage: () => void;
	setPreviousPage: () => void;
	setSearchValue: (search: string) => void;
	clearState: () => void;
	setPageSize: (size: string) => void;
	setSortBy: (sort: string) => void;
	setSortDirection: (dir: boolean) => void;
}
export interface AlarmsDetailsListFilters {
	page: number;
	pageSize: string;
	sortBy: string;
	sortDirection: boolean;
	setPage: (page: number) => void;
	setNextPage: () => void;
	setPreviousPage: () => void;
	setPageSize: (size: string) => void;
	setSortBy: (sort: string) => void;
	setSortDirection: (dir: boolean) => void;
}

export interface AlarmsDetailsListState
	extends Omit<
		AlarmsDetailsListFilters,
		"sortBy" | "sortDirection" | "setSortBy" | "setSortDirection"
	> {}

export interface ActiveAlarmsState
	extends Omit<
		RequestsFilters,
		| "startDate"
		| "endDate"
		| "setDates"
		| "requestType"
		| "setRequestType"
		| "isReturnAction"
		| "setIsReturnAction"
		| "sortBy"
		| "sortDirection"
		| "setSortBy"
		| "setSortDirection"
	> {
	comesFromDashboard: boolean;
	comesFromHistory: boolean;
	setComesFromDashboard: (value: boolean) => void;
	setComesFromHistory: (value: boolean) => void;
}

export interface AlarmsAdminState extends RequestsFilters {
	expirationStartDate: Dayjs | null;
	expirationEndDate: Dayjs | null;
	foliosStatus: number;
	setFoliosStatus: (value: number) => void;
	setExpirationDates: (dates: NoUndefinedRangeValueType<Dayjs>) => void;
}

export type TabSelected = "0" | "1" | "2" | "3";
export interface AlarmsTabState {
	tabSelected: TabSelected;
	isReturnAction: boolean;
	setIsReturnAction: (value: boolean) => void;
	setTabSelected: (tab: TabSelected) => void;
	clearState: () => void;
}

const initialState = {
	searchValue: "",
	page: 1,
	pageSize: "10",
	requestType: -1,
	sortBy: "-1",
	sortDirection: true,
};

export const alarmsAdminState: StateCreator<AlarmsAdminState> = (set) => ({
	...initialState,
	expirationStartDate: null,
	expirationEndDate: null,
	foliosStatus: -1,
	setFoliosStatus: (value) => set({ foliosStatus: value }),
	setRequestType: (requestType) => set({ requestType }),
	setExpirationDates: (dates) =>
		set({ expirationStartDate: dates[0], expirationEndDate: dates[1] }),
	setPage: (page) => set((state) => ({ ...state, page })),
	setNextPage: () => set((state) => ({ ...state, page: state.page + 1 })),
	setPreviousPage: () => set((state) => ({ ...state, page: state.page - 1 })),
	setSearchValue: (search) => set({ searchValue: search }),
	clearState: () => set({ ...initialState }),
	setPageSize: (pageSize) => set({ pageSize }),
	setSortBy: (sortBy) => set({ sortBy }),
	setSortDirection: (sortDirection) => set({ sortDirection }),
});

export const activeAlarmsState: StateCreator<ActiveAlarmsState> = (set) => ({
	searchValue: "",
	page: 1,
	pageSize: "10",
	comesFromDashboard: false,
	comesFromHistory: false,
	setComesFromDashboard: (value) => set({ comesFromDashboard: value }),
	setComesFromHistory: (value) => set({ comesFromHistory: value }),
	setPage: (page) => set((state) => ({ ...state, page })),
	setNextPage: () => set((state) => ({ ...state, page: state.page + 1 })),
	setPreviousPage: () => set((state) => ({ ...state, page: state.page - 1 })),
	setSearchValue: (search) => set({ searchValue: search }),
	clearState: () => set({ page: 1, searchValue: "" }),
	setPageSize: (pageSize) => set({ pageSize }),
});

export const alarmsTabState: StateCreator<AlarmsTabState> = (set) => ({
	tabSelected: "0",
	isReturnAction: false,
	setTabSelected: (tab: TabSelected) => set({ tabSelected: tab }),
	clearState: () => set({ tabSelected: "0" }),
	setIsReturnAction: (value) => set({ isReturnAction: value }),
});

export const alarmsDetailsListState: StateCreator<AlarmsDetailsListState> = (
	set,
) => ({
	page: 1,
	pageSize: "10",
	setPage: (page) => set((state) => ({ ...state, page })),
	setNextPage: () => set((state) => ({ ...state, page: state.page + 1 })),
	setPreviousPage: () => set((state) => ({ ...state, page: state.page - 1 })),
	setPageSize: (pageSize) => set({ pageSize }),
});
