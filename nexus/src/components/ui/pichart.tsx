"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "Tech", visitors: 98, fill: "var(--color-Tech)" },
  { browser: "ROI", visitors: 59, fill: "var(--color-ROI)" },
  { browser: "MVP", visitors: 187, fill: "var(--color-MVP)" },
  { browser: "Stock", visitors: 90, fill: "var(--color-Stock)" },
  { browser: "other", visitors: 29, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Dollars Millions",
  },
  Tech: {
    label: "Tech",
    color: "hsl(var(--chart-1))",
  },
  ROI: {
    label: "ROI",
    color: "hsl(var(--chart-2))",
  },
  MVP: {
    label: "MVP",
    color: "hsl(var(--chart-3))",
  },
  Stock: {
    label: "Stock",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Pichart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (<div className="border border-border dark:border-border-dark flex flex-col lg:flex-row justify-center gap-20 px-20">
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue</CardTitle>
        <CardDescription>January - Dec 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Millions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total revenue for the last 11 months
        </div>
      </CardFooter>
    </Card>

<div className="flex flex-col items-center flex-shrink justify-center">
<h1 style={{fontSize: 'clamp(1rem, 2rem, 2.3rem)'}}>We achieved everything by cooperation</h1><br/>
<p className="text-1rem item-center">Every goal is possible</p>
</div>

</div>
  )
}
