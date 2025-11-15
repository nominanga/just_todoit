interface ExampleComponentProps {
    value: string
}

const ExampleComponent = ({value}: ExampleComponentProps) => {
    return (
        <div>
            <h1>{value}</h1>
        </div>
    );
};

export default ExampleComponent;