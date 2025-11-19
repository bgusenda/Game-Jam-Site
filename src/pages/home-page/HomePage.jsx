// Componentes
import { Card } from "../../components/macomponents"
import MagneticButton from "../../components/MagneticButton"
import { useEffect, useRef } from "react"

// Data
import { aboutGameData, teamMembersData } from "./homepgData"

export default function HomePage() {
    const teamRef = useRef(null)
    const motionAllowed = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    useEffect(() => {
        if (!motionAllowed) return
        const section = teamRef.current
        if (!section) return
        const members = Array.from(section.querySelectorAll('.team-member'))

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    members.forEach((m, i) => {
                        m.style.setProperty('--i', i)
                        m.classList.add('reveal')
                    })
                    observer.disconnect()
                }
            })
        }, { threshold: 0.25 })

        observer.observe(section)
        return () => observer.disconnect()
    }, [motionAllowed])

    return (
        <div className="home-div">
            <div className="game-title container col jc-center ai-center">
                <h1>Aliens e Dinossauro:</h1>
                <h2>Uma Invasão Muito Maluca</h2>
            </div>

            <div className="about-game container col jc-fx-start ai-center">
                <h1>Sobre o Jogo</h1>

                <div className="card-grid container">
                    {aboutGameData.map((item) => (
                        <Card width={320} height={300} id={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div ref={teamRef} className="team-members container col jc-fx-start ai-center">
                <h1>Nossa Equipe</h1>

                <div className="grid container col">
                    {teamMembersData.map((item, idx) => (
                        <div className="team-member container row jc-spacebetween">
                            <p className={item.name == "Miguel Custodio" ? "role miguel" : "role"}>{item.role}</p>
                            <div className="dots"></div>
                            <p className="name">
                                {item.name}
                                <span>{item.number}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lets-play container jc-center ai-center">
                <MagneticButton threshold={240} strength={0.4}>
                    <p>pronto para jogar?</p>
                </MagneticButton>
            </div>
        </div>
    )
}