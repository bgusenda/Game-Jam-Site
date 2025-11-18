export function Card({ width, height, children }) {

    return (
        <div className="card-div container col jc-center ai-center"
            style={{
                width: width,
                height: height,
                padding: 4,
                borderRadius: 10
            }}
        >
            {children}
        </div>
    )
}