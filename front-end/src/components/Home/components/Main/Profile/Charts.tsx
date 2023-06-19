import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const labels = ["First Game", "Second Game", "Third Game", "Fourth Game", "Fifth Game", "Sixth Game", "Seventh Game", "Eighth Game", "Ninth Game", "Tenth Game"];
var element: number[] = [60, 120, 240, 120, 240, 360, 480, 520, 640, 760];
const LastOne = Math.max(...element);
const colorGraph = {
    Fail: { gradient: 'rgba(237, 81, 82, 0.3)', endColor: 'rgba(237, 81, 82, 0)', border: "#ED5152" },
    success: { gradient: 'rgba(0, 136, 122, 0.3)', endColor: 'rgba(0, 136, 122, 0)', border: "#00887A "}

}
const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: "",
            data: element,
            borderColor: LastOne >= 1000 ? colorGraph.success.border : colorGraph.Fail.border,
            backgroundColor: (ctx: any) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height); // Adjust the gradient dimensions for a vertical gradient
                gradient.addColorStop(0, LastOne >= 1000 ? colorGraph.success.gradient : colorGraph.Fail.gradient); // Starting color with transparency
                gradient.addColorStop(1, LastOne >= 1000 ? colorGraph.success.endColor : colorGraph.Fail.endColor); // Ending color with transparency
                return gradient;
            },
        }
    ]
};

const options = {
    elements: {
        line: {
            tension: 0.7
        }
    },
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {

            display: false,
            suggestedMax: 1000,
            grid: {
                display: false
            }
        }
    },
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: (context: any) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    const data = context.parsed.y;
                    return `You have collected in your ${label} a ${data} points`;
                },
                labelColor: () => ({
                    borderColor: 'transparent',
                    backgroundColor: 'transparent'
                })
            },
            displayColors: false
        }
    }
};
function Charts() {
    return (
        <div style={{ width: '48.06rem', height: '20.25rem', overflow: 'hidden' }}>
            <Line
                data={data}
                options={options}
                width={'48.1rem'}
                height={'20.25rem'}
                style={{ margin: 0, padding: 0 }}
            />
        </div>
    );
}
export default Charts;