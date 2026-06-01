'use client';
"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

/* ─────────────────────────────────────
   SIGNAL BARS  (drain 4→0 then reset)
───────────────────────────────────── */
function SignalBars() {
    const [active, setActive] = useState(4)
    useEffect(() => {
        const id = setInterval(() => setActive(p => (p <= 0 ? 4 : p - 1)), 700)
        return () => clearInterval(id)
    }, [])
    return (
        <div className="flex items-end gap-[3px]">
            {[1, 2, 3, 4].map(b => (
                <div key={b} style={{
                    width: 4, height: 4 + b * 4, borderRadius: 2,
                    background: b <= active ? "#2934E4" : "#1e2030",
                    boxShadow: b <= active ? "0 0 6px #2934E4" : "none",
                    transition: "background .3s, box-shadow .3s",
                }} />
            ))}
        </div>
    )
}

/* ─────────────────────────────────────
   DANGLING WIRE SVG
   Logo sits at top, wire drops from
   a port in the bottom of the logo card.
───────────────────────────────────── */
function WireScene() {
    const [phase, setPhase] = useState(0)
    useEffect(() => {
        let raf
        const tick = () => { setPhase(p => p + 0.025); raf = requestAnimationFrame(tick) }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    const swayX  = Math.sin(phase)        * 22
    const swayX2 = Math.sin(phase + 0.9)  * 14
    const swayY  = Math.abs(Math.sin(phase * 0.6)) * 6

    // Wire origin = bottom-centre of the logo card  (cx=250, y=148)
    const ox = 250, oy = 152
    // Dangling end
    const ex = 250 + swayX, ey = 310 + swayY
    const wirePath = `M ${ox} ${oy} C ${ox} ${oy + 80}, ${ex + swayX2} ${ey - 60}, ${ex} ${ey}`

    return (
        <svg viewBox="0 0 500 340" className="w-full max-w-[340px] sm:max-w-[400px]" style={{ overflow: "visible" }}>
            <defs>
                {/* Wire gradient */}
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#2934E4" />
                    <stop offset="70%"  stopColor="#3a46ee" />
                    <stop offset="100%" stopColor="#0f1028" />
                </linearGradient>

                {/* Logo wave gradient */}
                <linearGradient id="lg" x1="272" y1="109" x2="744" y2="400" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#2934E4" />
                    <stop offset="100%" stopColor="#171D7E" />
                </linearGradient>

                {/* Logo AI-text glow filter */}
                <filter id="aiGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                    <feFlood floodColor="#2934E4" floodOpacity="0.9" result="col" />
                    <feComposite in="col" in2="blur" operator="in" result="shadow" />
                    <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Wire glow */}
                <filter id="wireGlow">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Spark glow */}
                <filter id="sg">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* ── Logo card background ── */}
            <rect x="60" y="10" width="380" height="148" rx="16"
                fill="#09091a" stroke="#2934E430" strokeWidth="1.5" />

            {/* Subtle inner glow on card */}
            <rect x="60" y="10" width="380" height="148" rx="16"
                fill="none" stroke="#2934E418" strokeWidth="8" />

            {/* ── WHEEDLE WAVE LOGO — centred in card ── */}
            {/* viewBox of original logo: 0 0 900 432, wave path only
                We scale to fit ~340px wide inside card starting x=80
                scale = 340/900 ≈ 0.378 → height = 432*0.378 ≈ 163, too tall
                Use scale 0.3 → 270×130, center in card (380w, 148h)
                offset x = 60 + (380-270)/2 = 60+55 = 115
                offset y = 10 + (148-90)/2 = 10+29 = 39  (wave occupies ~y98–346, span=248, *0.3=74)
                Actual wave: yMin≈56, yMax≈420 → span 364 → *0.3=109
                Let's use transform="translate(115,14) scale(0.307)"
            */}
            <g transform="translate(115, 16) scale(0.307)">
                {/* Wave path */}
                <path
                    d="M432.365 245.036L367.844 110.934C364.179 103.316 356.473 98.4722 348.019 98.4722H272.19C263.052 98.4722 257.267 108.278 261.687 116.276L383.212 336.179C386.381 341.913 392.415 345.472 398.967 345.472H481.952C489.417 345.472 496.107 340.865 498.769 333.891L540.949 223.379C542.213 220.066 546.844 219.915 548.322 223.138L589.904 313.823C590.865 315.919 591.982 317.942 593.243 319.873L595.178 322.834C616.115 354.881 663.329 354.092 683.184 321.364C684.954 318.446 686.384 315.334 687.444 312.089L749.132 123.314C751.068 117.39 756.465 113.28 762.691 112.99L818.208 110.399C822.524 110.197 825.631 114.486 824.095 118.525L742.348 333.472C729.201 366.913 693.244 385.366 658.41 376.551L608.807 363.999C606.607 363.442 605.327 366.399 607.238 367.622L649 394.349C655.873 398.748 663.261 402.283 670.998 404.876C716.265 420.047 765.468 397.002 782.794 352.516L887.653 83.283C893.156 69.156 881.552 54.2827 866.511 56.1823L732.556 73.0992C716.279 75.1549 702.689 86.5002 697.759 102.148L656.118 234.333C654.456 239.606 647.153 240.017 644.91 234.963L590.151 111.549C586.623 103.598 578.74 98.4722 570.041 98.4722H515.383C506.317 98.4722 498.18 104.033 494.886 112.48L443.362 244.615C441.456 249.502 434.639 249.763 432.365 245.036Z"
                    fill="url(#lg)" stroke="url(#lg)" strokeWidth="2"
                />

                {/* AI text */}
                <g filter="url(#aiGlow)">
                    <path d="M135.309 151.427L137.868 157.268C139.214 160.491 140.493 163.199 141.705 165.392C142.962 167.54 144.354 169.13 145.88 170.159L149.314 171.904C150.122 172.352 150.885 172.688 151.603 172.912C153.309 173.538 154.139 174.523 154.094 175.866C154.05 177.745 152.882 178.663 150.593 178.618L148.169 178.484L143.995 178.148C140 177.925 135.578 177.813 130.73 177.813C126.107 177.813 122.157 177.925 118.88 178.148L115.109 178.484C114.346 178.618 113.651 178.663 113.022 178.618C111.002 178.708 110.015 177.813 110.06 175.933C110.104 174.59 110.958 173.583 112.618 172.912C116.254 171.211 118.072 169.13 118.072 166.668C118.027 165.011 117.668 163.266 116.995 161.431L115.109 156.731L113.09 151.83C112.236 149.95 111.137 148.585 109.79 147.735C108.444 146.929 106.873 146.459 105.077 146.325C104.224 146.28 103.08 146.258 101.643 146.258H84.0696L82.1842 146.325C78.6833 146.593 76.192 148.204 74.7107 151.159L72.8928 155.59C71.5012 159.349 70.8279 162.281 70.8727 164.385C70.9627 168.503 74.5759 171.345 81.7131 172.912C83.5536 173.269 84.5185 174.254 84.6085 175.866C84.5633 177.656 83.7107 178.574 82.0498 178.618C81.4212 178.663 80.3889 178.596 78.9525 178.417L75.4512 178.148C72.0846 177.969 69.3466 177.857 67.2368 177.813C65.172 177.857 62.389 177.969 58.8877 178.148C57.3616 178.238 56.1945 178.328 55.3865 178.417C54.0399 178.596 53.0748 178.663 52.4913 178.618L51.2793 178.417C50.4713 178.104 50.0449 177.32 50 176.067C50 174.814 50.404 173.963 51.212 173.516L52.8953 172.912C55.9925 171.927 58.6858 168.816 60.975 163.579L64.4763 155.791L66.4962 151.226L96.7279 85.0941L97.6032 83.4159C98.1421 82.3862 98.6133 81.6253 99.0174 81.133C99.5559 80.596 100.319 80.3049 101.306 80.2603C102.249 80.3049 103.012 80.596 103.596 81.133C104.09 81.6253 104.583 82.3862 105.077 83.4159L105.885 85.0941L135.309 151.427ZM83.1269 132.494L82.0498 135.045C81.6009 136.03 81.399 136.746 81.4438 137.194C81.309 137.686 81.466 138 81.915 138.134C82.1842 138.313 82.925 138.402 84.137 138.402H101.441H103.596L105.75 138.335C105.93 138.246 106.065 138.111 106.155 137.932L106.289 137.194C106.244 136.567 106.065 135.851 105.75 135.045L104.673 132.494L95.9201 112.823C95.516 111.972 95.1571 111.278 94.8426 110.741L94.304 110.137L93.8999 110.003L92.9573 110.741C92.5984 111.278 92.2391 111.972 91.8802 112.823L83.1269 132.494ZM171.196 102.349L171.129 98.1861C171.039 94.3815 170.232 91.6961 168.705 90.1297C167.448 88.9212 164.8 87.8694 160.76 86.9741L159.077 86.4371C158.448 86.1686 158.09 85.7878 158 85.2954L157.865 84.2214C157.91 82.5206 158.336 81.5806 159.144 81.4015L160.423 81.2674C161.366 81.2674 162.488 81.3121 163.79 81.4015L170.658 81.8717C172.588 82.0504 175.82 82.1177 180.353 82.073C185.067 82.1177 188.411 82.0504 190.386 81.8717L197.254 81.4015C198.511 81.3121 199.633 81.2674 200.62 81.2674L201.899 81.4015C202.797 81.5806 203.224 82.3189 203.179 83.6172C203.134 85.0495 202.73 85.9669 201.967 86.3698L200.284 86.9741C195.212 88.317 192.585 92.0543 192.406 98.1861C192.316 99.3498 192.294 100.737 192.339 102.349V157.47L192.406 161.632C192.451 165.392 193.259 168.078 194.83 169.689C196.221 171.121 198.87 172.195 202.775 172.912C204.615 173.315 205.581 174.321 205.67 175.933C205.581 177.454 205.154 178.282 204.391 178.417L203.044 178.618C202.416 178.663 201.316 178.596 199.745 178.417C198.443 178.328 196.132 178.216 192.81 178.081C187.693 177.902 184.304 177.813 182.643 177.813C181.206 177.813 178.064 177.902 173.217 178.081C169.805 178.216 167.516 178.328 166.349 178.417C164.733 178.596 163.633 178.663 163.05 178.618C161.254 178.574 160.356 177.701 160.356 176C160.356 174.747 160.76 173.919 161.568 173.516L163.251 172.912C166.214 172.061 168.279 170.741 169.446 168.95C170.389 167.518 170.95 165.079 171.129 161.632L171.196 157.47V102.349Z"
                        fill="white" />
                </g>

                {/* Large star */}
                <path d="M258.068 2.5L262.207 17.8288C262.712 19.6994 262.965 20.6346 263.463 21.3993C263.904 22.0758 264.483 22.6526 265.161 23.0925C265.928 23.5894 266.866 23.8414 268.742 24.3449L284.115 28.4722L268.742 32.5995C266.866 33.1031 265.928 33.355 265.161 33.8519C264.483 34.2917 263.904 34.8686 263.463 35.5453C262.965 36.3098 262.712 37.2451 262.207 39.1156L258.068 54.4444L253.929 39.1156C253.424 37.2451 253.171 36.3098 252.673 35.5453C252.231 34.8686 251.653 34.2917 250.975 33.8519C250.208 33.355 249.27 33.1031 247.394 32.5995L232.021 28.4722L247.394 24.3449C249.27 23.8414 250.208 23.5894 250.975 23.0925C251.653 22.6526 252.231 22.0758 252.673 21.3993C253.171 20.6346 253.424 19.6994 253.929 17.8288L258.068 2.5Z"
                    stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                {/* Small star */}
                <path d="M229.723 43.3682L232.097 52.1598C232.386 53.2326 232.531 53.7689 232.817 54.2074C233.07 54.5954 233.402 54.9262 233.791 55.1786C234.231 55.4636 234.769 55.608 235.845 55.8967L244.661 58.264L235.845 60.6313C234.769 60.92 234.231 61.0644 233.791 61.3493C233.402 61.6018 233.07 61.9326 232.817 62.3206C232.531 62.7591 232.386 63.2953 232.097 64.3682L229.723 73.1598L227.349 64.3682C227.059 63.2953 226.914 62.7591 226.629 62.3206C226.375 61.9326 226.044 61.6018 225.654 61.3493C225.215 61.0644 224.677 60.92 223.601 60.6313L214.784 58.264L223.601 55.8967C224.677 55.608 225.215 55.4636 225.654 55.1786C226.044 54.9262 226.375 54.5954 226.629 54.2074C226.914 53.7689 227.059 53.2326 227.349 52.1598L229.723 43.3682Z"
                    stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* ── Port socket at bottom of card ── */}
            {/* The port is where the wire exits */}
            <rect x="237" y="148" width="26" height="9" rx="3" fill="#0d0d22" stroke="#2934E460" strokeWidth="1" />
            <rect x="241" y="150" width="5" height="5" rx="1" fill="#0a0a1a" stroke="#2934E470" strokeWidth="0.8" />
            <rect x="254" y="150" width="5" height="5" rx="1" fill="#0a0a1a" stroke="#2934E470" strokeWidth="0.8" />
            {/* Blinking red LED = disconnected */}
            <motion.circle cx="250" cy="143" r="3" fill="#ef4444"
                animate={{ opacity: [1, 0.15, 1], scale: [1, 0.7, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                filter="url(#sg)"
            />

            {/* ── Wire glow shadow ── */}
            <path d={wirePath} stroke="#2934E455" strokeWidth="12"
                fill="none" strokeLinecap="round" filter="url(#wireGlow)" />

            {/* ── Main wire body ── */}
            <path d={wirePath} stroke="url(#wg)" strokeWidth="5.5"
                fill="none" strokeLinecap="round" />

            {/* ── Highlight stripe on wire ── */}
            <path d={wirePath} stroke="rgba(255,255,255,0.12)" strokeWidth="2"
                fill="none" strokeLinecap="round" strokeDasharray="5 9" />

            {/* ── Plug connector at dangling end ── */}
            <g transform={`translate(${ex - 10}, ${ey})`}>
                {/* Plug body */}
                <rect x="0" y="0" width="20" height="13" rx="3"
                    fill="#111130" stroke="#2934E470" strokeWidth="1.2" />
                {/* Pins */}
                <rect x="4" y="2.5" width="4" height="8" rx="1.5" fill="#ff6b35" opacity="0.95" />
                <rect x="12" y="2.5" width="4" height="8" rx="1.5" fill="#ff6b35" opacity="0.95" />
                {/* Pin glow */}
                <rect x="4" y="2.5" width="4" height="8" rx="1.5"
                    fill="none" stroke="#ff6b3580" strokeWidth="2" />
                <rect x="12" y="2.5" width="4" height="8" rx="1.5"
                    fill="none" stroke="#ff6b3580" strokeWidth="2" />
            </g>

            {/* ── Electric arcs / sparks at plug end ── */}
            {[
                { dx: -6, dy: -6, col: "#ffffff", delay: 0 },
                { dx: 4,  dy: -8, col: "#2934E4", delay: 0.15 },
                { dx: 10, dy: -5, col: "#ff6b35", delay: 0.28 },
                { dx: -2, dy: -10, col: "#7b86ff", delay: 0.42 },
            ].map((s, i) => (
                <motion.circle key={i}
                    cx={ex + s.dx} cy={ey + s.dy} r={1.8}
                    fill={s.col} filter="url(#sg)"
                    animate={{ opacity: [0, 1, 0], cx: [ex + s.dx, ex + s.dx + (Math.random() > 0.5 ? 3 : -3), ex + s.dx] }}
                    transition={{ duration: 0.35, delay: s.delay, repeat: Infinity, repeatDelay: 0.55 }}
                />
            ))}

            {/* Arc flash at disconnect */}
            <motion.path
                d={`M ${ex - 4} ${ey - 4} Q ${ex + 2} ${ey - 12} ${ex + 6} ${ey - 4}`}
                stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round"
                animate={{ opacity: [0, 1, 0], strokeWidth: [1, 2.5, 0.5] }}
                transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 0.9 }}
                filter="url(#sg)"
            />
        </svg>
    )
}


/* ─────────────────────────────────────
   GLITCH 404
───────────────────────────────────── */
function Glitch404() {
    const [g, setG] = useState(false)
    useEffect(() => {
        const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 140) }, 3000)
        return () => clearInterval(id)
    }, [])
    const base = {
        fontFamily: "'Courier New',monospace", fontWeight: 900,
        fontSize: "clamp(64px,13vw,130px)", lineHeight: 1, letterSpacing: "-4px",
    }
    return (
        <div className="relative inline-block select-none">
            <span style={{
                ...base,
                background: "linear-gradient(135deg,#4a56ff 0%,#2934E4 45%,#171D7E 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>404</span>
            {g && <span className="absolute inset-0" style={{ ...base, color: "#ff2244", opacity: 0.65, clipPath: "inset(20% 0 58% 0)", transform: "translate(-4px,2px)" }}>404</span>}
            {g && <span className="absolute inset-0" style={{ ...base, color: "#00e5ff", opacity: 0.5, clipPath: "inset(60% 0 8% 0)", transform: "translate(4px,-2px)" }}>404</span>}
        </div>
    )
}

/* ═══════════════════════════════════════════════
   MAIN  PAGE
═══════════════════════════════════════════════ */
export default function NotFound() {
    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center px-4 py-8 text-center"
            style={{ background: "#030309" }}>

            {/* Faint blue radial glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 65% 55% at 50% 38%, #2934E414 0%, transparent 70%)" }} />

            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(#2934E407 1px,transparent 1px),linear-gradient(90deg,#2934E407 1px,transparent 1px)",
                    backgroundSize: "52px 52px",
                }} />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, #030309 100%)" }} />

            {/* Corner brackets */}
            {[
                { top: 18, left: 18,  borderTop: "2px solid", borderLeft:   "2px solid" },
                { top: 18, right: 18, borderTop: "2px solid", borderRight:  "2px solid" },
                { bottom: 18, left: 18,  borderBottom: "2px solid", borderLeft:  "2px solid" },
                { bottom: 18, right: 18, borderBottom: "2px solid", borderRight: "2px solid" },
            ].map((s, i) => (
                <motion.div key={i} className="absolute w-9 h-9 pointer-events-none"
                    style={{ ...s, borderColor: "#2934E428" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.08 }} />
            ))}

            {/* ── STATUS BAR ── */}
            <motion.div
                className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-full mb-5"
                style={{ background: "#0b0b1e", border: "1px solid #2934E428", fontFamily: "'Courier New',monospace" }}
                initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
            >
                <SignalBars />
                <span className="text-xs" style={{ color: "#4b5563" }}>wheedletechnologies.ai</span>
                <span className="text-xs font-bold" style={{ color: "#6b7280" }}>·</span>
                <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ef4444" }}
                    animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
                <span className="text-xs font-semibold" style={{ color: "#ef4444", letterSpacing: "0.08em" }}>CONNECTION LOST</span>
            </motion.div>

            {/* ── WIRE SCENE (logo + dangling wire) ── */}
            <motion.div className="relative z-10"
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}>
                <WireScene />
            </motion.div>

            {/* ── 404 ── */}
            <motion.div className="relative z-10 -mt-2"
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <Glitch404 />
            </motion.div>

            {/* ── DIVIDER ── */}
            <motion.div className="relative z-10 flex items-center gap-3 w-full max-w-[320px] my-3"
                initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,#2934E4)" }} />
                <motion.div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#2934E4", boxShadow: "0 0 8px 3px #2934E460" }}
                    animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to left,transparent,#2934E4)" }} />
            </motion.div>

            {/* ── HEADING + SUBTEXT ── */}
            <motion.div className="relative z-10 space-y-1.5 mb-5"
                initial="h" animate="v"
                variants={{ h: {}, v: { transition: { staggerChildren: 0.14, delayChildren: 0.85 } } }}>
                <motion.h1
                    className="text-xl sm:text-2xl font-bold text-white"
                    style={{ fontFamily: "'Courier New',monospace", letterSpacing: "0.04em" }}
                    variants={{ h: { opacity: 0, y: 14 }, v: { opacity: 1, y: 0 } }}>
                    Connection Lost
                </motion.h1>
                <motion.p
                    className="text-xs sm:text-sm max-w-[300px] mx-auto"
                    style={{ color: "#6b7280", fontFamily: "'Courier New',monospace", lineHeight: 1.75 }}
                    variants={{ h: { opacity: 0, y: 10 }, v: { opacity: 1, y: 0 } }}>
                    The wire between you and{" "}
                    <span style={{ color: "#4a56ff" }}>Wheedle</span>{" "}
                    has been unplugged. This page doesn't exist.
                </motion.p>
            </motion.div>

            {/* ── BUTTONS ── */}
            <motion.div className="relative z-10 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}>

                {/* Primary */}
                <motion.a href="/"
                    className="relative px-7 py-3 text-sm font-bold text-white rounded-xl overflow-hidden cursor-pointer flex items-center gap-2 justify-center"
                    style={{
                        background: "linear-gradient(135deg,#2934E4,#171D7E)",
                        fontFamily: "'Courier New',monospace", letterSpacing: "0.06em",
                        boxShadow: "0 0 24px #2934E440, inset 0 1px 0 #ffffff15",
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 42px #2934E46a" }}
                    whileTap={{ scale: 0.96 }} transition={{ duration: 0.18 }}>
                    {/* shimmer */}
                    <motion.div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(105deg,transparent 35%,#ffffff18 50%,transparent 65%)", backgroundSize: "200% 100%" }}
                        animate={{ backgroundPositionX: ["200%", "-100%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }} />
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    <span className="relative z-10">Reconnect</span>
                </motion.a>
            </motion.div>
        </div>
    )
}