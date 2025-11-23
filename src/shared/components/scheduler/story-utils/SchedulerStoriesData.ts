import { getFirstDayOfWeek } from "@/lib/utils/date/getFirstDayOfWeek";
import { IScheduledEvent } from "../types";

const monday = getFirstDayOfWeek(new Date());

// Получаем даты для предыдущей и следующей недели
const previousMonday = new Date(monday);
previousMonday.setDate(previousMonday.getDate() - 7);

const nextMonday = new Date(monday);
nextMonday.setDate(nextMonday.getDate() + 7);

function createEvent(
	title: string,
	dayFromMonday: number,
	startHour: number,
	startMinutes: number,
	endHour: number,
	endMinutes: number,
	baseDate: Date = monday
) {
	const startDate = new Date(baseDate);
	startDate.setDate(startDate.getDate() + dayFromMonday);
	startDate.setHours(startHour, startMinutes, 0, 0);

	const endDate = new Date(startDate);
	endDate.setHours(endHour, endMinutes, 0, 0);

	return {
		id: Math.random(),
		title,
		startDate,
		endDate
	};
}

export const storiesEvents: IScheduledEvent[] = [
	// Предыдущая неделя
	createEvent("Daily meeting", 0, 10, 0, 10, 30, previousMonday),
	createEvent("Daily meeting", 1, 10, 0, 10, 30, previousMonday),
	createEvent("Daily meeting", 2, 10, 0, 10, 30, previousMonday),
	createEvent("Daily meeting", 3, 10, 0, 10, 30, previousMonday),
	createEvent("Daily meeting", 4, 10, 0, 10, 30, previousMonday),
	createEvent("Анализ требований", 0, 8, 0, 9, 30, previousMonday),
	createEvent("Обзор безопасности", 0, 14, 0, 15, 30, previousMonday),
	createEvent("Оптимизация БД", 1, 13, 0, 14, 30, previousMonday),
	createEvent("Встреча с инвесторами", 1, 16, 0, 17, 30, previousMonday),
	createEvent("Обучение новичков", 2, 9, 0, 11, 0, previousMonday),
	createEvent("Разработка API", 2, 15, 0, 16, 30, previousMonday),
	createEvent("Тестирование релиза", 3, 7, 30, 9, 0, previousMonday),
	createEvent("Планирование инфраструктуры", 3, 14, 0, 15, 30, previousMonday),
	createEvent("Анализ метрик", 4, 11, 0, 12, 0, previousMonday),
	createEvent("Обсуждение UX", 4, 15, 0, 16, 30, previousMonday),

	// Текущая неделя (оставляем существующие события)
	createEvent("Daily meeting", 0, 10, 0, 10, 30),
	createEvent("Daily meeting", 1, 10, 0, 10, 30),
	createEvent("Daily meeting", 2, 10, 0, 10, 30),
	createEvent("Daily meeting", 3, 10, 0, 10, 30),
	createEvent("Daily meeting", 4, 10, 0, 10, 30),
	createEvent("Cross-team meeting", 0, 10, 0, 10, 30),
	createEvent("Demonstration", 1, 10, 0, 10, 30),
	createEvent("Планирование спринта", 0, 9, 0, 10, 30),
	createEvent("Встреча с клиентом", 0, 14, 0, 15, 30),
	createEvent("Код-ревью", 1, 13, 0, 14, 0),
	createEvent("Интервью кандидата", 1, 16, 0, 17, 0),
	createEvent("Ретроспектива", 2, 11, 0, 12, 30),
	createEvent("Обучение команды", 2, 15, 0, 16, 30),
	createEvent("Архитектурный комитет", 3, 8, 0, 9, 30),
	createEvent("Презентация проекта", 3, 13, 30, 15, 0),
	createEvent("Техническая консультация", 4, 7, 30, 8, 30),
	createEvent("Совещание по бюджету", 4, 10, 0, 11, 30),
	createEvent("Дизайн-ревью", 4, 15, 30, 17, 0),
	createEvent("Оценка задач", 2, 7, 0, 8, 30),
	createEvent("Демонстрация MVP", 1, 11, 30, 13, 0),
	createEvent("Обсуждение архитектуры", 3, 16, 0, 18, 0),

	// Следующая неделя
	createEvent("Daily meeting", 0, 10, 0, 10, 30, nextMonday),
	createEvent("Daily meeting", 1, 10, 0, 10, 30, nextMonday),
	createEvent("Daily meeting", 2, 10, 0, 10, 30, nextMonday),
	createEvent("Daily meeting", 3, 10, 0, 10, 30, nextMonday),
	createEvent("Daily meeting", 4, 10, 0, 10, 30, nextMonday),
	createEvent("Стратегическое планирование", 0, 7, 0, 8, 30, nextMonday),
	createEvent("Обзор конкурентов", 0, 15, 0, 16, 30, nextMonday),
	createEvent("Интеграционное тестирование", 1, 8, 30, 10, 0, nextMonday),
	createEvent("Оптимизация производительности", 1, 14, 0, 15, 30, nextMonday),
	createEvent("Разработка микросервисов", 2, 13, 0, 14, 30, nextMonday),
	createEvent("Обзор кода legacy проекта", 2, 16, 0, 17, 30, nextMonday),
	createEvent("Настройка CI/CD", 3, 9, 0, 10, 0, nextMonday),
	createEvent("Разработка документации", 3, 15, 30, 17, 0, nextMonday),
	createEvent("Анализ логов", 4, 8, 0, 9, 30, nextMonday),
	createEvent("Подготовка к релизу", 4, 13, 0, 14, 30, nextMonday)
];
