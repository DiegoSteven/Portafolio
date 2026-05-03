"use client"

import { createElement, useEffect, useRef, type ElementType } from "react"
import Letterize from "letterizejs"
import anime from "animejs"
import { cn } from "@/lib/utils"

type LetterAnimateProps = {
  /** Texto plano a animar (Letterize reemplaza el contenido del nodo) */
  text: string
  as?: ElementType
  className?: string
  /** Repetir en bucle (mejor solo en piezas decorativas) */
  loop?: boolean
  /** Solo animar cuando el bloque entra en el viewport */
  whenVisible?: boolean
  rootMargin?: string
  threshold?: number
}

export function LetterAnimate({
  text,
  as: Tag = "span",
  className,
  loop = false,
  whenVisible = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
}: LetterAnimateProps) {
  const ref = useRef<HTMLElement | null>(null)
  const ran = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof globalThis.window === "undefined") return

    const reduce = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      el.textContent = text
      return
    }

    const start = (): (() => void) | undefined => {
      if (ran.current) return
      ran.current = true
      el.textContent = text

      const letterize = new Letterize({
        targets: el,
        className: "letter-animate-char",
      })

      const listAll = letterize.listAll
      if (!listAll?.length) {
        ran.current = false
        return
      }

      const cols = Math.max(1, letterize.list[0]?.length ?? 1)
      const rows = Math.max(1, letterize.list.length)
      const heavy = listAll.length > 56
      const delay = heavy
        ? anime.stagger(10, { from: "first" })
        : anime.stagger(32, {
            grid: [cols, rows],
            from: "center",
          })

      const timeline = anime.timeline({
        targets: listAll,
        easing: "easeOutExpo",
        delay,
        loop,
      })

      timeline
        .add({ scale: 0.55, duration: loop ? 380 : 320 })
        .add({ letterSpacing: "0.14em", duration: loop ? 320 : 260 })
        .add({ scale: 1, duration: loop ? 380 : 320 })
        .add({ letterSpacing: "0.02em", duration: loop ? 320 : 260 })

      return () => {
        timeline.pause()
        anime.remove(listAll)
      }
    }

    let cleanupTimeline: (() => void) | undefined

    if (whenVisible) {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return
          io.disconnect()
          cleanupTimeline = start()
        },
        { root: null, rootMargin, threshold },
      )
      io.observe(el)
      return () => {
        io.disconnect()
        cleanupTimeline?.()
        ran.current = false
      }
    }

    cleanupTimeline = start()
    return () => {
      cleanupTimeline?.()
      ran.current = false
    }
  }, [text, loop, whenVisible, rootMargin, threshold])

  return createElement(
    Tag,
    {
      ref,
      className: cn(className),
      suppressHydrationWarning: true,
    },
    text,
  )
}
