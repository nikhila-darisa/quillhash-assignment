import React from 'react'
import { Line} from 'react-chartjs-2'
class Chart extends React.Component {
    constructor() {
        super()
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: "BTC_USD",
                    data: [],
                    backgroundColor: "#0db1b1",
                    borderWidth: 1,
                    borderColor: 'maroon',
                    pointBackgroundColor: "#50500b",
                }],
            }
        }
    }
    componentDidMount() {
        const Data = {
            type: "subscribe",
            channels: [
                {
                    name: "ticker",
                    product_ids: ["BTC-USD"],
                },
            ],
        };
        
        this.webSocket = new WebSocket("wss://ws-feed.pro.coinbase.com");

        this.webSocket.onopen = () => {
            this.webSocket.send(JSON.stringify(Data));
        };

        this.webSocket.onmessage = (content) => {
            const responseDate = JSON.parse(content.data);
            // console.log(responseDate)
            if (responseDate.type === 'ticker') {
                const dataSets = this.state.chartData.datasets[0];
                let data = dataSets.data.push(responseDate.price)
                data = dataSets.data.push(responseDate.price)                
                this.state.chartData.labels.push( new Date().toLocaleTimeString())
                // console.log(dateLables)
                let newResponse = {
                    ...this.state.chartData,
                    dataSets: [data],
                }
                this.setState({
                    chartData: newResponse
                })
            } else {
                return null
            }
        };
    }

    componentWillUnmount() {
        this.webSocket.close();
    }

    render() {
        return (
            <div>
                <Line
                    data={this.state.chartData}
                    width={50}
                    height={500}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}
export default Chart