import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", employees: 12 },
  { month: "Feb", employees: 18 },
  { month: "Mar", employees: 25 },
  { month: "Apr", employees: 22 },
  { month: "May", employees: 35 },
  { month: "Jun", employees: 40 },
  { month: "Jul", employees: 48 },
];

function EmployeePerformanceChart() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-slate-800 text-lg">
            Employee Growth
          </h2>

          <p className="text-sm text-slate-500">
            Last 7 months overview
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900">
            48
          </p>

          <span className="text-green-500 text-sm">
            +12.8%
          </span>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="employeeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#7C3AED"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#7C3AED"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#7C3AED",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="employees"
              stroke="#7C3AED"
              strokeWidth={4}
              fill="url(#employeeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmployeePerformanceChart;