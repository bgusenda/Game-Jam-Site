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
            <div className="logo container jc-center ai-center">
                <img src="" alt="logo do jogo" />
            </div>

            <div className="about-game container col jc-fx-start ai-center">
                <h1>Sobre o Jogo</h1>

                <div className="card-grid container">
                    {aboutGameData.map((item) => (
                        <Card width={320} height={340} id={item.id}>
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
                        <div key={idx} className="team-member container row jc-spacebetween" style={{ '--i': idx }}>
                            <p className="role">{item.role}</p>
                            <p className="name">{item.name}</p>
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