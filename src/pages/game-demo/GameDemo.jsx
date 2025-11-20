import Magnet from "../../components/Magnet"

export default function GameDemoPage() {
    return (
        <div className="container col jc-center ai-center" style={{ padding: "6em 0" }}>
            <iframe
                src="/games/index.html"
                width="800"
                height="600"
                style={{
                    border: 'none',
                    boxShadow: '0 0 20px rgba(247, 247, 247, 0.66)',
                }}
            ></iframe>
        </div>
    )
}