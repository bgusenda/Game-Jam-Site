import Magnet from "../../components/Magnet"

export default function GameDemoPage() {
    return (
        <div className="container col jc-center ai-center" style={{ padding: "6em 0" }}>
            <iframe
                src="/game/index.html"
                width="1280"
                height="720"
                style={{
                    border: 'none',
                    maxWidth: '100%',
                    aspectRatio: '16 / 9',
                    boxShadow: '0 0 20px rgba(247, 247, 247, 0.66)',
                }}
                allowFullScreen
            ></iframe>
        </div>
    )
}