export interface IScheduledEvent<T = unknown> {
	id: string | number;
	title: string;
	startDate: Date;
	endDate: Date;

	data?: T;
}
