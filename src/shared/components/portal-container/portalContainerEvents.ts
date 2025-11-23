type Listener = (mount: boolean) => void;

/**
 * Простой EventEmitter для синхронизации PortalContainer и usePortalContainer
 */
class PortalContainerEvents {
	private listeners = new Set<Listener>();
	isContainerMounted = false;

	subscribe(listener: Listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}

	notify(mount: boolean = true) {
		if (mount && this.isContainerMounted) {
			throw new Error(
				"PortalContainer уже смонтирован. В приложении может быть только один экземпляр PortalContainer."
			);
		}
		this.isContainerMounted = mount;
		this.listeners.forEach((listener) => listener(mount));
	}
}

export const portalContainerEvents = new PortalContainerEvents();
