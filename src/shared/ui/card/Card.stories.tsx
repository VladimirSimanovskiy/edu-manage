/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { storyDecorator } from "@/lib/utils/storybook";
import { Meta, StoryObj } from "@storybook/react";
import {
	ArrowDown,
	ArrowUp,
	Boxes,
	Calendar,
	Cloud,
	CloudDownload,
	Code,
	Download,
	Flower,
	GitBranchPlus,
	Hospital,
	KeyRoundIcon,
	Puzzle,
	Settings
} from "lucide-react";
import { useState } from "react";
import { ActionCard, CardFooter, CardMenuTrigger, CardSubTitle, CardVisualBadge } from ".";
import { Badge } from "../badge/Badge";
import { Description } from "../description/Description";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown";
import { FeatureIcon } from "../icon/feature-icon/FeatureIcon";
import { Icon } from "../icon/Icon";
import { FieldLabel } from "../label";
import { MenuItemCommonTemplate } from "../menu-item";
import { ProgressBlockTemplate } from "../progress/templates/ProgressBlockTemplate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip/Tooltip";
import { Card } from "./Card";
import { CardFeature } from "./components/CardFeature";
import { CardFolder } from "./components/CardFolder";
import { CardTitle } from "./components/CardTitle";

const meta: Meta<typeof Card> = {
	component: Card,
	parameters: {
		controls: {
			exclude: ["children"]
		}
	},
	tags: ["autodocs"],
	decorators: [storyDecorator("mx-auto max-w-[1144px] w-full")]
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		children: "Простая карточка с текстом"
	}
};

interface CardContentProps {
	title: string;
	description: string;
	role?: string;
	status?: string;
	lastActivity?: string;
	statusType?: "success" | "warning" | "error";
}

export const ActionCardExample: Story = {
	render: (_) => (
		<ActionCard onClick={() => alert("clicked")} className="mx-auto h-32 w-60">
			<CardTitle>Карточка как кнопка</CardTitle>
			<CardSubTitle>
				На карточку можно нажать, она ловит фокус и вызывает действие по нажатию на space
			</CardSubTitle>
		</ActionCard>
	)
};

export const ActionCardFolder: Story = {
	render: (_) => (
		<CardFolder className="mx-auto h-36 w-60">
			<ActionCard className="h-full" onClick={() => alert("clicked")}>
				<CardTitle>Карточка как кнопка с папкой</CardTitle>
				<CardSubTitle>На карточку можно нажать, она ловит фокус и вызывает действие</CardSubTitle>
			</ActionCard>
		</CardFolder>
	)
};

export const StyledCards: Story = {
	render: (_) => (
		<div className="flex flex-row gap-4">
			<Card
				className={cn([
					"border-status-error-secondary-border bg-secondary-bg shadow-sm",
					"hover:border-status-error-secondary-border hover:bg-status-error-bg hover:shadow-sm",
					"focus:border-status-error-secondary-border focus:bg-secondary-bg focus:shadow-focus-error"
				])}
			>
				<CardTitle>Error card</CardTitle>
				<CardSubTitle>Error card</CardSubTitle>
			</Card>
			<Card
				className={cn([
					"border-primary-border bg-secondary-bg-hover shadow-sm",
					"hover:border-primary-border hover:bg-secondary-bg-hover hover:shadow-sm",
					"focus:border-primary-border focus:bg-secondary-bg-hover focus:shadow-sm"
				])}
			>
				<CardTitle>Readonly card</CardTitle>
				<CardSubTitle>Readonly card</CardSubTitle>
			</Card>
			<Card
				className={cn([
					"border-primary-accent bg-secondary-bg shadow-base",
					"hover:border-primary-accent hover:bg-secondary-bg-hover",
					"focus:border-primary-accent focus:bg-secondary-bg focus:shadow-focus"
				])}
			>
				<CardTitle>Selected card</CardTitle>
				<CardSubTitle>Selected card</CardSubTitle>
			</Card>
			<Card
				className={cn([
					"border-status-success-border bg-status-success-bg shadow-base",
					"hover:border-status-success-border hover:bg-status-success-bg-hover",
					"focus:border-status-success-border focus:bg-status-success-bg focus:shadow-focus"
				])}
			>
				<CardTitle>Success card</CardTitle>
				<CardSubTitle>Success card</CardSubTitle>
			</Card>
		</div>
	)
};

export const CardWithFeature: Story = {
	render: (_) => (
		<Card className="mx-auto h-32 w-60">
			<CardTitle>Catalog title</CardTitle>
			<CardSubTitle>Subtitle text</CardSubTitle>
			<CardFooter className="-space-x-[5px]">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Badge
								startIcon={ArrowUp}
								focus="high"
								size="sm"
								className="relative z-10 gap-0 p-1 pr-1.5"
							>
								27
							</Badge>
						</TooltipTrigger>
						<TooltipContent>
							<p>Увеличение на 27 единиц</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Badge startIcon={ArrowDown} size="sm" className="relative gap-0 p-1 pr-1.5">
								157
							</Badge>
						</TooltipTrigger>
						<TooltipContent>
							<p>Уменьшение на 157 единиц</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
			<CardFeature>
				<FeatureIcon type="primary" icon={Flower} size="lg" className="h-11 w-11 border-0 p-2.5" />
			</CardFeature>
		</Card>
	)
};

export const CardWithFolder: Story = {
	render: (_) => (
		<CardFolder className="mx-auto h-32 w-60">
			<ActionCard className="h-full pb-2" onClick={() => alert("clicked")}>
				<CardTitle>Catalog title</CardTitle>
				<CardSubTitle>Subtitle text</CardSubTitle>
				<CardFooter className="-space-x-1.5">
					<ProgressBlockTemplate
						size="sm"
						title="Загрузка..."
						description="50%"
						onCancel={() => {}}
						value={50}
					/>
				</CardFooter>
			</ActionCard>
		</CardFolder>
	)
};

export const CardWithVisualBadge: Story = {
	render: (_) => (
		<Card className="mx-auto h-32 w-60">
			<CardTitle>Пример с визуальным бейджем</CardTitle>
			<CardSubTitle className="pr-14">На месте бейджа может быть любой элемент</CardSubTitle>
			<CardVisualBadge className="bg-gray-500"></CardVisualBadge>
		</Card>
	)
};

export const CardWithMenu: Story = {
	render: (_) => (
		<ActionCard className="mx-auto h-32 w-60" onClick={() => alert("clicked")}>
			<CardTitle>Пример с меню</CardTitle>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<CardMenuTrigger />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<MenuItemCommonTemplate text="Настройки" icon={Settings} />
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MenuItemCommonTemplate text="Скачать" icon={Download} />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</ActionCard>
	)
};

const resizeableStyle = {
	resize: "both",
	overflow: "auto",
	minWidth: "50px",
	minHeight: "50px"
} as const;

export const CardResizableExamples: Story = {
	render: (_) => (
		<div className="flex flex-col gap-4">
			<Card style={resizeableStyle}>
				<CardTitle>Catalog title</CardTitle>
				<CardSubTitle>Subtitle text</CardSubTitle>
				<CardFooter className="-space-x-[5px]">
					<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
						157
					</Badge>
					<Badge startIcon={ArrowUp} focus="high" size="sm" className="gap-0 p-1 pr-1.5">
						27
					</Badge>
				</CardFooter>
				<CardVisualBadge className="bg-gray-500"></CardVisualBadge>
			</Card>
			<Card style={resizeableStyle}>
				<CardTitle>Catalog title</CardTitle>
				<CardSubTitle>Subtitle text</CardSubTitle>
				<CardFooter className="-space-x-[5px]">
					<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
						157
					</Badge>
					<Badge startIcon={ArrowUp} focus="high" size="sm" className="gap-0 p-1 pr-1.5">
						27
					</Badge>
				</CardFooter>
				<CardFeature>
					<FeatureIcon type="primary" icon={Flower} size="lg" className="h-11 w-11 border-0 p-2.5" />
				</CardFeature>
			</Card>

			<CardFolder style={resizeableStyle}>
				<Card className="h-full pb-2">
					<CardTitle>Catalog title</CardTitle>
					<CardSubTitle>Subtitle text</CardSubTitle>
					<CardFooter className="-space-x-1.5">
						<ProgressBlockTemplate
							size="sm"
							title="Загрузка..."
							description="50%"
							onCancel={() => {}}
							value={50}
						/>
					</CardFooter>
				</Card>
			</CardFolder>

			<CardFolder style={resizeableStyle} className="h-36">
				<Card className="h-full pb-2">
					<CardTitle>Group title</CardTitle>
					<CardSubTitle>Subtitle text</CardSubTitle>
					<CardFooter className="-space-x-1.5">
						<ProgressBlockTemplate
							size="sm"
							title="Загрузка..."
							description="50%"
							onCancel={() => {}}
							value={50}
						/>
					</CardFooter>
				</Card>
			</CardFolder>
		</div>
	)
};

export const Showcase: Story = {
	render: (_) => (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-6">
				<h3 className="text-center text-2xl font-semibold text-primary-fg">Избранное</h3>
				<div className="flex flex-row flex-wrap gap-6">
					<div>
						<Card className="h-[154px] w-[268px] bg-amber-50 hover:bg-amber-100 dark:bg-secondary-bg dark:hover:bg-secondary-bg-hover">
							<CardTitle>Dcore</CardTitle>
							<CardSubTitle>Работа с ресурсами</CardSubTitle>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="60"
									height="60"
									viewBox="0 0 60 60"
									fill="none"
								>
									<path
										d="M30.9993 57.6344C45.2591 57.6344 56.8189 51.5877 56.8189 44.1287C56.8189 36.6697 45.2591 30.623 30.9993 30.623C16.7395 30.623 5.17969 36.6697 5.17969 44.1287C5.17969 51.5877 16.7395 57.6344 30.9993 57.6344Z"
										fill="url(#paint0_linear_26961_68295)"
									/>
									<path
										d="M30.9993 44.9224C45.2591 44.9224 56.8189 38.8757 56.8189 31.4168C56.8189 23.9578 45.2591 17.9111 30.9993 17.9111C16.7395 17.9111 5.17969 23.9578 5.17969 31.4168C5.17969 38.8757 16.7395 44.9224 30.9993 44.9224Z"
										fill="url(#paint1_linear_26961_68295)"
									/>
									<path
										d="M30.9988 31.4365C45.226 31.4365 56.7594 25.4744 56.7594 18.1196C56.7594 10.7649 45.226 4.80273 30.9988 4.80273C16.7717 4.80273 5.23828 10.7649 5.23828 18.1196C5.23828 25.4744 16.7717 31.4365 30.9988 31.4365Z"
										fill="url(#paint2_linear_26961_68295)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_26961_68295"
											x1="67.8954"
											y1="26.4066"
											x2="-21.3854"
											y2="70.2559"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#FB6434" />
											<stop offset="1" stop-color="#FFC700" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_26961_68295"
											x1="67.8954"
											y1="13.6947"
											x2="-21.3854"
											y2="57.544"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#F49800" />
											<stop offset="1" stop-color="#FFB800" />
										</linearGradient>
										<linearGradient
											id="paint2_linear_26961_68295"
											x1="67.8105"
											y1="0.645264"
											x2="-20.8551"
											y2="44.7086"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#FBB034" />
											<stop offset="1" stop-color="#FFDD00" />
										</linearGradient>
									</defs>
								</svg>
							</CardVisualBadge>
						</Card>
					</div>
					<div>
						<Card className="h-[154px] w-[268px] bg-orange-50 hover:bg-orange-100 dark:bg-secondary-bg dark:hover:bg-secondary-bg-hover">
							<TooltipProvider>
								<Tooltip>
									<CardTitle className="line-clamp-2" asChild>
										<TooltipTrigger asChild>
											<span>
												Руководство пользователя по эксплуатации там чего-то чего-то и так
												далее-далее
											</span>
										</TooltipTrigger>
									</CardTitle>
									<TooltipContent>
										Руководство пользователя по эксплуатации там чего-то чего-то и так далее-далее
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<CardSubTitle>Для проектов, документации и хранения знаний</CardSubTitle>
							<CardFooter>
								<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
									57
								</Badge>
							</CardFooter>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="61"
									height="52"
									viewBox="0 0 61 52"
									fill="none"
								>
									<path
										d="M53.252 36.7207C54.5768 37.3863 54.5768 39.278 53.252 39.9434L31.6289 50.8057C29.7666 51.741 28.5247 51.7416 27.2832 51.1182C25.8461 50.3959 25.4346 49.3104 25.4209 47.7256L6.48828 38.332L31.6289 25.8584L53.252 36.7207Z"
										fill="url(#paint0_linear_26961_63410)"
									/>
									<path
										d="M56.4619 13.2627C60.186 11.3917 62.3582 13.574 62.6689 16.626C62.6735 19.7514 61.0566 24.2618 56.4619 26.0479L56.4092 26.0205L56.4609 26.0479L31.6631 38.3164L31.6934 38.332C28.8492 39.8349 26.7271 42.0746 25.7959 44.8809C25.0396 47.1604 25.2511 49.4624 26.7266 50.8066L1.89648 38.332C0.344934 36.7728 0.411612 34.3855 1.27637 32.0957C2.52978 28.7768 3.44303 28.0448 6.83398 25.876L6.80078 25.8594L31.6309 12.9512L44.1641 19.5615L56.4619 13.2627Z"
										fill="url(#paint1_linear_26961_63410)"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M56.4594 13.3852L36.4186 23.7985C35.8446 24.0968 35.2009 24.2352 34.5549 24.1991L13.0185 22.997C12.5944 22.9734 12.2444 22.6569 12.1782 22.2373L10.733 13.067C10.6119 12.2988 10.9971 11.5396 11.6884 11.1835L31.6292 0.911603H31.6292C33.4914 -0.0239688 34.733 -0.024014 35.9745 0.599761L60.8048 13.0734C59.4372 12.3864 58.0114 12.7615 56.4594 13.3852V13.3852V13.3852Z"
										fill="url(#paint2_linear_26961_63410)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_26961_63410"
											x1="63.359"
											y1="15.7061"
											x2="-3.69813"
											y2="56.8781"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#D90000" />
											<stop offset="1" stop-color="#F04019" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_26961_63410"
											x1="57.8454"
											y1="16.258"
											x2="5.128"
											y2="38.3219"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#FF2A00" />
											<stop offset="1" stop-color="#F09819" />
										</linearGradient>
										<linearGradient
											id="paint2_linear_26961_63410"
											x1="70.3641"
											y1="-9.33357"
											x2="4.64783"
											y2="35.9018"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#FE7156" />
											<stop offset="1" stop-color="#FFB447" />
										</linearGradient>
									</defs>
								</svg>
							</CardVisualBadge>
						</Card>
					</div>
					<div>
						<Card className="hover:border-status-success-border-hover h-[154px] w-[268px] border-status-success-border bg-status-success-bg hover:bg-status-success-bg-hover">
							<CardTitle>Sellout +</CardTitle>
							<CardSubTitle>Анализ данных</CardSubTitle>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="60"
									height="60"
									viewBox="0 0 60 60"
									fill="none"
								>
									<g clip-path="url(#clip0_26961_45105)">
										<path
											d="M42.5224 36.4847L20.6914 25.4561L40.9685 15.4624C41.9475 14.9799 43.0959 14.9827 44.0724 15.4702L60.9879 23.9127C62.2698 24.5523 62.2786 26.3778 61.0036 27.0302L42.5224 36.4847Z"
											fill="url(#paint0_linear_26961_45105)"
										/>
										<path
											d="M42.2613 56.3843V16.0778C42.2613 14.6648 41.4906 11.8597 40.2787 11.2476L22.9085 2.47516C21.7475 1.88884 20.4023 4.29516 20.4023 5.64883V45.7302C20.4023 47.1302 21.1589 48.4084 22.3536 49.0273L39.7395 58.0328C40.9016 58.6347 42.2613 57.7461 42.2613 56.3843Z"
											fill="url(#paint1_linear_26961_45105)"
										/>
										<path
											d="M19.1074 46.7063L1.68211 37.8001C0.402848 37.1463 0.416206 35.3135 1.70486 34.6784L20.4149 25.457L42.5188 36.4856L22.272 46.7138C21.2764 47.2168 20.1005 47.2141 19.1074 46.7063Z"
											fill="url(#paint2_linear_26961_45105)"
										/>
									</g>
									<defs>
										<linearGradient
											id="paint0_linear_26961_45105"
											x1="69.8288"
											y1="6.65399"
											x2="13.1011"
											y2="42.8163"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#5AFF15" />
											<stop offset="0.0001" stop-color="#A8E063" />
											<stop offset="1" stop-color="#00870D" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_26961_45105"
											x1="46.4326"
											y1="-17.6922"
											x2="4.90079"
											y2="-12.1811"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#5AFF15" />
											<stop offset="0.0001" stop-color="#8AE718" />
											<stop offset="1" stop-color="#057710" />
										</linearGradient>
										<linearGradient
											id="paint2_linear_26961_45105"
											x1="50.4932"
											y1="16.9097"
											x2="-6.92243"
											y2="53.548"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#5AFF15" />
											<stop offset="0.0001" stop-color="#A8E063" />
											<stop offset="1" stop-color="#00B712" />
										</linearGradient>
										<clipPath id="clip0_26961_45105">
											<rect width="62" height="62" fill="white" transform="translate(0.332031)" />
										</clipPath>
									</defs>
								</svg>
							</CardVisualBadge>
						</Card>
					</div>
					<div>
						<Card className="hover:border-status-info-border-hover h-[154px] w-[268px] bg-status-info-bg hover:bg-status-info-bg-hover">
							<CardTitle>MDT</CardTitle>
							<CardSubTitle>Одна платформа - множество решений</CardSubTitle>
							<CardFooter className="-space-x-[5px]">
								<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
									157
								</Badge>
								<Badge startIcon={ArrowUp} focus="high" size="sm" className="gap-0 p-1 pr-1.5">
									27
								</Badge>
							</CardFooter>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="39"
									height="60"
									viewBox="0 0 39 60"
									fill="none"
								>
									<path
										d="M13.8524 17.1399C16.6965 15.7635 19.9417 17.9124 19.9417 21.1724V35.9293C19.9417 39.4392 17.9677 42.6322 14.8954 44.0915L6.97961 47.8516C4.13831 49.2013 0.917947 47.0519 0.917969 43.8057V29.1198C0.917969 25.6328 2.86659 22.4562 5.9089 20.984L13.8524 17.1399Z"
										fill="url(#paint0_linear_26961_72415)"
									/>
									<path
										d="M22.9604 0.368478C25.7954 -0.851964 29.0084 1.0917 29.0084 4.02701V44.5741C29.0084 47.7481 27.0388 50.6355 23.9734 51.9553L16.0754 55.3552C13.2405 56.5757 10.0273 54.6321 10.0273 51.6969V11.1496C10.0273 7.97563 11.997 5.08824 15.0624 3.76857L22.9604 0.368478Z"
										fill="url(#paint1_linear_26961_72415)"
									/>
									<path
										d="M32.3103 18.9474C35.0317 17.718 38.1164 19.6758 38.1164 22.6326V50.7654C38.1164 53.9627 36.2254 56.8711 33.2827 58.2003L25.7006 61.6253C22.979 62.8545 19.8945 60.8967 19.8945 57.94V29.8071C19.8945 26.61 21.7853 23.7016 24.7282 22.3723L32.3103 18.9474Z"
										fill="url(#paint2_linear_26961_72415)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_26961_72415"
											x1="5.10321"
											y1="16.031"
											x2="-15.146"
											y2="32.2437"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#2B32B2" />
											<stop offset="1" stop-color="#1285C9" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_26961_72415"
											x1="36.6009"
											y1="-6.86683"
											x2="-4.19215"
											y2="-3.85574"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#2B32B2" />
											<stop offset="1" stop-color="#4AC5F4" />
										</linearGradient>
										<linearGradient
											id="paint2_linear_26961_72415"
											x1="52.9246"
											y1="0.967306"
											x2="9.62616"
											y2="7.62481"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#2B32B2" />
											<stop offset="1" stop-color="#4FDFFF" />
										</linearGradient>
									</defs>
								</svg>
							</CardVisualBadge>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<h3 className="text-center text-2xl font-semibold text-primary-fg">Группы и проекты</h3>
				<div className="flex flex-row flex-wrap gap-6">
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Продукты</CardTitle>
								<CardFooter>
									<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
										15
									</Badge>
								</CardFooter>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={Boxes}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Gramax Cloud</CardTitle>
								<CardFooter>
									<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
										15
									</Badge>
								</CardFooter>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={Cloud}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Модули</CardTitle>
								<CardSubTitle>Работа с ресурсами</CardSubTitle>
								<CardFooter>
									<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
										15
									</Badge>
								</CardFooter>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={Puzzle}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Модуль импорта данных</CardTitle>
								<CardFooter className="-space-x-[5px]">
									<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
										15
									</Badge>
									<Badge startIcon={ArrowUp} focus="high" size="sm" className="gap-0 p-1 pr-1.5">
										42
									</Badge>
								</CardFooter>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={CloudDownload}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Спецификации API</CardTitle>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={Code}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Методы загрузки через Git</CardTitle>
								<CardSubTitle>Различные методы загрузки через Git</CardSubTitle>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={GitBranchPlus}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
					<div>
						<CardFolder>
							<Card className="h-[116px] w-[268px]">
								<CardTitle>Параметры авторизации</CardTitle>
								<CardFooter>
									<Badge startIcon={ArrowDown} size="sm" className="gap-0 p-1 pr-1.5">
										15
									</Badge>
								</CardFooter>
								<CardFeature>
									<FeatureIcon
										size="lg"
										type="primary"
										icon={KeyRoundIcon}
										className="h-11 w-11 border-0 p-2.5"
									/>
								</CardFeature>
							</Card>
						</CardFolder>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<div className="flex flex-row flex-wrap gap-6">
					<div>
						<ActionCard onClick={() => alert("clicked")} className="h-[132px] w-[268px] pb-2">
							<CardTitle>Gramax Team</CardTitle>
							<CardSubTitle>Документация команды</CardSubTitle>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<CardMenuTrigger />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									<DropdownMenuItem
										onClick={(e) => e.stopPropagation()}
										onSelect={() => alert("Download")}
									>
										<Icon icon={Download} />
										Download
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<CardFooter>
								<ProgressBlockTemplate size="sm" indeterminate={true} title="Ожидание загрузки..." />
							</CardFooter>
						</ActionCard>
					</div>
					<div>
						<ActionCard
							onClick={() => {
								alert("clicked");
							}}
							className="h-[132px] w-[268px]"
						>
							<CardTitle>Dzen public</CardTitle>
							<CardSubTitle>Лента публикаций для просмотра и создания контента</CardSubTitle>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="61"
									height="60"
									viewBox="0 0 61 60"
									fill="none"
								>
									<g clip-path="url(#clip0_26961_75452)">
										<circle cx="31.668" cy="31" r="31" fill="black" />
										<path
											d="M62.668 31.3321V30.6679C48.9394 30.225 42.673 29.8929 37.6465 25.0214C32.7751 19.995 32.4208 13.7286 32.0001 0H31.3358C30.893 13.7286 30.5608 19.995 25.6894 25.0214C20.663 29.8929 14.3965 30.2471 0.667969 30.6679V31.3321C14.3965 31.775 20.663 32.1071 25.6894 36.9786C30.5608 42.005 30.9151 48.2714 31.3358 62H32.0001C32.443 48.2714 32.7751 42.005 37.6465 36.9786C42.673 32.1071 48.9394 31.7529 62.668 31.3321Z"
											fill="white"
										/>
									</g>
									<defs>
										<clipPath id="clip0_26961_75452">
											<rect width="62" height="62" fill="white" transform="translate(0.667969)" />
										</clipPath>
									</defs>
								</svg>
							</CardVisualBadge>
						</ActionCard>
					</div>
					<div>
						<ActionCard
							onClick={() => {
								alert("clicked");
							}}
							className="h-[132px] w-[268px]"
						>
							<CardTitle>Yandex Music</CardTitle>
							<CardSubTitle>Решение по архитектуре и продуктам</CardSubTitle>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="60"
									height="60"
									viewBox="0 0 60 60"
									fill="none"
								>
									<g clip-path="url(#clip0_26961_46819)">
										<path
											d="M13.1007 6.33697C17.662 2.9571 23.053 0.91394 28.6717 0.40625V9.70383C25.0397 10.1747 21.571 11.5653 18.6039 13.7639C14.8887 16.5168 12.1565 20.3909 10.8105 24.8147C9.46442 29.2385 9.57572 33.9777 11.1279 38.3333C12.6802 42.6891 15.5911 46.4309 19.4315 49.0063C23.2719 51.5818 27.8382 52.8549 32.4572 52.638C37.0761 52.4209 41.5029 50.7251 45.085 47.8009C48.6668 44.8764 51.214 40.8783 52.3511 36.3964C53.1443 33.27 53.2217 30.0236 52.6006 26.8939L60.4081 20.6171L60.4028 20.5665C62.5104 26.364 62.8324 32.6712 61.311 38.6693C59.6866 45.0722 56.0478 50.7837 50.9307 54.9614C45.8136 59.1386 39.4896 61.5612 32.8911 61.8712C26.2926 62.1812 19.7692 60.3625 14.2829 56.6831C8.7967 53.004 4.63815 47.6589 2.4207 41.4363C0.203247 35.2139 0.0442647 28.4435 1.96721 22.1239C3.89015 15.8041 7.7932 10.2698 13.1007 6.33697Z"
											fill="#FCCA00"
										/>
										<path
											d="M54.5211 10.6766L54.5538 10.7585L49.3364 19.0452C47.4388 16.2335 44.8965 13.8931 41.9208 12.2366V31.0944C41.9208 36.8802 37.2306 41.5706 31.4448 41.5706C25.659 41.5706 20.9688 36.8802 20.9688 31.0944C20.9688 25.3087 25.659 20.6183 31.4448 20.6183C33.6132 20.6183 35.6277 21.2772 37.2991 22.4055V0.837891C44.1006 2.14611 50.1063 5.69074 54.5211 10.6766Z"
											fill="#FC3F1D"
										/>
									</g>
									<defs>
										<clipPath id="clip0_26961_46819">
											<rect width="62" height="62" fill="white" transform="translate(0.332031)" />
										</clipPath>
									</defs>
								</svg>
							</CardVisualBadge>
						</ActionCard>
					</div>
					<div>
						<ActionCard
							onClick={() => {
								alert("clicked");
							}}
							className="h-[132px] w-[268px] pb-2"
						>
							<CardTitle>Gramax Docs</CardTitle>
							<CardSubTitle>Для документации и хранения знаний</CardSubTitle>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<CardMenuTrigger />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									<DropdownMenuItem
										onClick={(e) => e.stopPropagation()}
										onSelect={() => alert("Profile")}
									>
										<Icon icon={Download} />
										Download
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<CardFooter className="mr-14">
								<ProgressBlockTemplate
									size="sm"
									value={20}
									title="Загрузка"
									description="20%"
									onCancel={(e) => {
										e.stopPropagation();
										alert("canceled");
									}}
								/>
							</CardFooter>
							<CardVisualBadge>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="60"
									height="60"
									viewBox="0 0 60 60"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M3.2526 5.99994C0 10.1932 0 16.3021 0 28.52V33.48C0 45.6979 0 51.8068 3.2526 56.0001C4.04952 57.0274 4.97255 57.9505 5.99994 58.7474C10.1932 62 16.3021 62 28.52 62H33.48C45.6979 62 51.8068 62 56.0001 58.7474C57.0274 57.9505 57.9505 57.0274 58.7474 56.0001C62 51.8068 62 45.6979 62 33.48V28.52C62 16.3021 62 10.1932 58.7474 5.99994C57.9505 4.97255 57.0274 4.04952 56.0001 3.2526C51.8068 0 45.6979 0 33.48 0H28.52C16.3021 0 10.1932 0 5.99994 3.2526C4.97255 4.04952 4.04952 4.97255 3.2526 5.99994ZM42.0075 12.917H38.1325V10.3336H48.4659V12.917H44.5909V49.0836H48.4659V51.667H38.1325V49.0836H42.0075V12.917ZM20.9175 46.7756C22.2707 47.306 23.9688 47.5712 26.0118 47.5712C28.214 47.5712 30.0846 47.2132 31.6235 46.4971C33.1624 45.781 34.3431 44.7334 35.1656 43.3542C35.9881 41.975 36.3994 40.2776 36.3994 38.2619V19.1262C36.3994 18.8609 36.2933 18.6355 36.081 18.4498C35.8953 18.2377 35.6565 18.1316 35.3646 18.1316H30.7877C30.4958 18.1316 30.257 18.2377 30.0713 18.4498C29.8856 18.6355 29.7927 18.8609 29.7927 19.1262V20.5981C29.1294 19.7759 28.2803 19.0996 27.2456 18.5692C26.2373 18.0122 25.0168 17.7337 23.584 17.7337C22.2309 17.7337 21.0369 17.9592 20.0021 18.4101C18.9673 18.8344 18.0917 19.4577 17.3753 20.2799C16.6855 21.1021 16.1548 22.0834 15.7834 23.2238C15.4119 24.3643 15.1864 25.6506 15.1068 27.0828C15.0803 27.7724 15.0803 28.462 15.1068 29.1516C15.1864 30.6368 15.4119 31.9496 15.7834 33.0901C16.1814 34.2306 16.7253 35.1986 17.4151 35.9943C18.105 36.79 18.9673 37.3867 20.0021 37.7845C21.0369 38.1824 22.2309 38.3813 23.584 38.3813C24.9372 38.3813 26.0914 38.1824 27.0466 37.7845C28.0018 37.3602 28.7845 36.8165 29.3947 36.1534V38.8189C29.3947 39.7737 29.2621 40.5296 28.9967 41.0866C28.7314 41.67 28.3334 42.0811 27.8028 42.3198C27.2721 42.5851 26.6088 42.7177 25.8128 42.7177C25.0964 42.7177 24.5259 42.6116 24.1014 42.3994C23.7034 42.2137 23.385 41.9618 23.1462 41.6435C22.934 41.3253 22.7615 41.0202 22.6289 40.7285C22.5227 40.4368 22.3768 40.2246 22.1911 40.092C22.0319 39.9859 21.8329 39.9328 21.5941 39.9328H16.5396C16.2477 39.9328 15.9956 40.0257 15.7834 40.2113C15.5711 40.397 15.4783 40.6357 15.5048 40.9274C15.5313 41.3518 15.717 41.922 16.062 42.6381C16.4069 43.3807 16.9641 44.1234 17.7335 44.866C18.5295 45.6086 19.5908 46.2451 20.9175 46.7756ZM27.8028 32.6525C27.2721 33.0238 26.5822 33.2095 25.7332 33.2095C24.8576 33.2095 24.1545 33.0238 23.6238 32.6525C23.1197 32.2812 22.7483 31.7773 22.5095 31.1407C22.2972 30.5042 22.1645 29.8013 22.1115 29.0322C22.0849 28.4222 22.0849 27.8254 22.1115 27.242C22.1645 26.4728 22.2972 25.77 22.5095 25.1334C22.7483 24.4969 23.1197 23.993 23.6238 23.6217C24.1545 23.2504 24.8576 23.0647 25.7332 23.0647C26.5822 23.0647 27.2721 23.2504 27.8028 23.6217C28.3334 23.9665 28.7181 24.4306 28.9569 25.0141C29.2223 25.5976 29.3682 26.2341 29.3947 26.9237C29.4213 27.1889 29.4345 27.5867 29.4345 28.1172C29.4345 28.6476 29.4213 29.0587 29.3947 29.3505C29.3682 30.0135 29.2223 30.6368 28.9569 31.2203C28.7181 31.8038 28.3334 32.2812 27.8028 32.6525Z"
										fill="#0F172A"
									/>
								</svg>
							</CardVisualBadge>
						</ActionCard>
					</div>
				</div>
			</div>
		</div>
	)
};

const users = [
	{
		id: "1",
		name: "Иван Петров",
		role: "Разработчик",
		status: "Активный",
		lastActivity: "2 часа назад",
		statusType: "success"
	},
	{
		id: "2",
		name: "Анна Сидорова",
		role: "Дизайнер",
		status: "В отпуске",
		lastActivity: "1 день назад",
		statusType: "warning"
	},
	{
		id: "3",
		name: "Петр Иванов",
		role: "Менеджер",
		status: "Офлайн",
		lastActivity: "3 дня назад",
		statusType: "error"
	}
] as const;

const CardContent = ({
	title,
	description,
	role,
	status = "Активный",
	lastActivity = "2 часа назад",
	statusType = "success"
}: CardContentProps) => (
	<div className="flex flex-col gap-2 p-3">
		<div className="flex flex-row gap-2.5">
			<FeatureIcon type="primary" icon={Hospital} size="lg" className="shrink-0 rounded-full"></FeatureIcon>
			<div className="flex flex-1 flex-col items-start justify-center">
				<FieldLabel>{title}</FieldLabel>
				<Description>{description}</Description>
			</div>
			<Badge status={statusType} size="sm" className="shrink-0">
				{status}
			</Badge>
		</div>

		<div className="flex flex-col items-start gap-2">
			{role && <Description>{role}</Description>}
			<div className="flex flex-row items-center gap-1">
				<Icon
					className={statusType == "error" ? "text-status-error" : "text-status-success"}
					icon={Calendar}
				></Icon>
				<Description className={statusType == "error" ? "text-status-error" : "text-status-success"}>
					{lastActivity}
				</Description>
			</div>
		</div>
	</div>
);

export const CardWithCustomContent: Story = {
	render: (args) => (
		<Card className="px-0 py-0" {...args}>
			<CardContent
				title="Медик"
				description="Диагностический центр"
				role="Чебоксары, ул.Тополиная, 11а"
				lastActivity="Сегодня, 17:00 - 18:30"
			/>
		</Card>
	)
};

export const SingleSelectExample: Story = {
	render: function SingleSelectExample(_) {
		const [selectedId, setSelectedId] = useState<string | null>(null);

		return (
			<div className="flex flex-col gap-4 p-4">
				{users.map((user) => (
					<ActionCard
						key={user.id}
						onClick={() => setSelectedId(user.id)}
						className={cn(
							selectedId === user.id && [
								"border-primary-accent bg-secondary-bg shadow-base",
								"hover:border-primary-accent hover:bg-secondary-bg-hover",
								"focus:border-primary-accent focus:bg-secondary-bg focus:shadow-focus"
							]
						)}
					>
						<CardContent
							title="Карточка пользователя"
							description={user.name}
							role={user.role}
							status={user.status}
							lastActivity={`Последняя активность: ${user.lastActivity}`}
							statusType={user.statusType}
						/>
					</ActionCard>
				))}
			</div>
		);
	}
};
