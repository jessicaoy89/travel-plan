import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Steps, Button, message } from "antd";

const { Step } = Steps;

const steps = [{}, {}];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            steps: [{}]
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        this.props.update(current);
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
        this.props.update(current);
    }

    render() {
        const { current } = this.state;
        return (
            <>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() => message.success("Processing complete!")}
                        >
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </>
        );
    }
}
