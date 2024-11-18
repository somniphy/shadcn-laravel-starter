"use client";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Users2Icon } from "lucide-react";

interface DashboardProps {
    users: {
        total: number;
        list: Array<{
            id: number;
            name: string;
            email: string;
        }>;
        growth: number;
        monthly: Array<{
            month: string;
            count: number;
        }>;
    };
}

interface MonthlyUserData {
    month: string;
    users: number;
}

const getLastSixMonths = (monthlyData: Array<{ month: string; count: number }>): MonthlyUserData[] => {
    const months = [];
    const currentDate = new Date();

    for (let i = 5; i >= 0; i--) {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
        );
        const monthStr = date.toLocaleString("default", { month: "short" });
        const monthCount = monthlyData.find(m => m.month === monthStr)?.count ?? 0;
        months.push({
            month: monthStr,
            users: monthCount,
        });
    }

    return months;
};

const chartConfig = {
    users: {
        label: "Users",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export default function Dashboard(props: DashboardProps) {
    const userChartData = getLastSixMonths(props.users.monthly);
    return (
        <AuthenticatedLayout
            header={{
                title: "Dashboard",
            }}
        >

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-background shadow-sm sm:rounded-lg">
                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="analytics">
                                    Analytics
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="col-span-2">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Users
                                            </CardTitle>
                                            <Users2Icon className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {props.users.total}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                +{props.users.growth} from last
                                                month
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="analytics"
                                className="space-y-4"
                            >
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        
                                    <Card className="col-span-2">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                User Growth
                                            </CardTitle>
                                            <Users2Icon className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer
                                                config={chartConfig}
                                            >
                                                <BarChart
                                                    accessibilityLayer
                                                    data={userChartData}
                                                    layout="vertical"
                                                    margin={{
                                                        left: 50,
                                                        right: 20,
                                                        top: 10,
                                                        bottom: 10,
                                                    }}
                                                    height={300}
                                                >
                                                    <XAxis
                                                        type="number"
                                                        dataKey="users"
                                                        hide
                                                    />
                                                    <YAxis
                                                        dataKey="month"
                                                        type="category"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        axisLine={false}
                                                        tickFormatter={(
                                                            value
                                                        ) => value.slice(0, 3)}
                                                    />
                                                    <ChartTooltip
                                                        cursor={false}
                                                        content={
                                                            <ChartTooltipContent
                                                                hideLabel
                                                            />
                                                        }
                                                    />
                                                    <Bar
                                                        dataKey="users"
                                                        fill={
                                                            chartConfig.users
                                                                .color
                                                        }
                                                        radius={5}
                                                    />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
