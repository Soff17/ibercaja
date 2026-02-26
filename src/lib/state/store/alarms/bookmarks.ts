import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookmarksState = {
	bookmarkedIds: number[];
	hasBookmark: (id: number) => boolean;
	toggleBookmark: (id: number) => void;
	clearBookmarks: () => void;
};

export const useAlarmBookmarks = create<BookmarksState>()(
	persist(
		(set, get) => ({
			bookmarkedIds: [],
			hasBookmark: (id) => get().bookmarkedIds.includes(id),
			toggleBookmark: (id) => {
				const ids = get().bookmarkedIds;
				const next = ids.includes(id)
					? ids.filter((x) => x !== id)
					: [...ids, id];
				set({ bookmarkedIds: next });
			},
			clearBookmarks: () => set({ bookmarkedIds: [] }),
		}),
		{
			name: "alarm-bookmarks", // localStorage key
		},
	),
);
