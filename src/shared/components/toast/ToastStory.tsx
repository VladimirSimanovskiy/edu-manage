import { ToastOptions } from "./Toast";
/**
 * Фиктивный компонент для Storybook для:
 * - автоматической генерации argTypes https://storybook.js.org/docs/api/arg-types
 */

export type ToastStoryProps = { title: string } & ToastOptions;
export const ToastStory: React.FC<ToastStoryProps> = () => null;
