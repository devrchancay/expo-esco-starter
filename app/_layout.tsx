import { Slot } from "expo-router";
import { AppState, AppStateStatus } from "react-native";
import { SWRConfig } from "swr";

function HomeLayout() {
	const initFocus = (callback: () => void) => {
		let appState = AppState.currentState;
		const onAppStateChange = (nextAppState: AppStateStatus) => {
			if (appState.match(/inactive|background/) && nextAppState === "active") {
				callback();
			}
			appState = nextAppState;
		};

		const subscription = AppState.addEventListener("change", onAppStateChange);

		return () => {
			subscription.remove();
		};
	};

	return (
		<SWRConfig
			value={{
				provider: () => new Map(),
				isVisible: () => true,
				initFocus: initFocus,
			}}
		>
			<Slot />
		</SWRConfig>
	);
}

export default HomeLayout;
