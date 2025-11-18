import { Card } from "../../components/macomponents"

export default function HomePage() {
    return (
        <div className="home-div">
            <div className="about-game container col jc-fx-start ai-center">
                <h1>Sobre o Jogo</h1>

                <div className="card-grid container">
                    <Card width={400} height={500}>
                        <p>Hola!</p>
                    </Card>

                    <Card width={400} height={500}>
                        <p>Hola!</p>
                    </Card>

                    <Card width={400} height={500}>
                        <p>Hola!</p>
                    </Card>
                </div>
            </div>

            <div className="team-members container col jc-fx-start ai-center">
                <h1>Nossa Equipe</h1>

                <div className="card-grid container">
                    <Card width={400} height={300}>
                        <p>Hola!</p>
                    </Card>

                    <Card width={400} height={300}>
                        <p>Hola!</p>
                    </Card>

                    <Card width={400} height={300}>
                        <p>Hola!</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}