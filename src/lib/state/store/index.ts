import { create } from "zustand";
import {
	type ActiveAlarmsState,
	type AlarmsAdminState,
	type AlarmsDetailsListState,
	type AlarmsTabState,
	activeAlarmsState,
	alarmsAdminState,
	alarmsDetailsListState,
	alarmsTabState,
} from "./alarms";

const alarmsAdminSlice = create<AlarmsAdminState>((...a) => ({
	...alarmsAdminState(...a),
}));

const alarmsTabSlice = create<AlarmsTabState>((...a) => ({
	...alarmsTabState(...a),
}));

const activeAlarmsSlice = create<ActiveAlarmsState>((...a) => ({
	...activeAlarmsState(...a),
}));

const alarmsDetailsListSlice = create<AlarmsDetailsListState>((...a) => ({
	...alarmsDetailsListState(...a),
}));

export const useStore = () => ({
	alarmsAdmin: alarmsAdminSlice(),
	activeAlarmsAdmin: activeAlarmsSlice(),
	alarmsTab: alarmsTabSlice(),
	alarmsDetailsList: alarmsDetailsListSlice(),
});
